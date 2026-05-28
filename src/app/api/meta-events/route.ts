import { NextResponse } from 'next/server';

const META_API_VERSION = 'v19.0';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      eventName,
      eventId,
      sourceUrl,
      customData,
      userAgent,
      timestamp,
      fbc,
      fbp
    } = body;

    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
    const testEventCode = process.env.META_TEST_EVENT_CODE;

    if (!pixelId || !accessToken) {
      return NextResponse.json({ success: false, error: 'Missing Meta credentials' }, { status: 500 });
    }

    const unixTime = Math.floor(new Date(timestamp || Date.now()).getTime() / 1000);

    const userData: Record<string, unknown> = {
      client_user_agent: userAgent || 'Unknown',
    };

    if (fbc) userData.fbc = fbc;
    if (fbp) userData.fbp = fbp;

    // Get IP address from headers if possible
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip');
    if (ip) {
      userData.client_ip_address = ip.split(',')[0].trim();
    }

    const eventPayload: Record<string, unknown> = {
      event_name: eventName,
      event_time: unixTime,
      action_source: 'website',
      event_source_url: sourceUrl,
      user_data: userData,
      custom_data: customData || {},
    };

    if (eventId) {
      eventPayload.event_id = eventId;
    }

    const payload: Record<string, unknown> = {
      data: [eventPayload],
    };

    if (testEventCode) {
      payload.test_event_code = testEventCode;
    }

    const metaUrl = `https://graph.facebook.com/${META_API_VERSION}/${pixelId}/events?access_token=${accessToken}`;

    const response = await fetch(metaUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('[Meta CAPI Error]', result);
      return NextResponse.json({ success: false, error: result }, { status: response.status });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('[Meta CAPI Exception]', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
