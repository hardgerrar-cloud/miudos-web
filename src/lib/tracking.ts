declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

// Simple fallback for crypto.randomUUID if not available in old browsers
const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const updateInternalLog = (logId: string, eventName: string, eventId: string, options: Record<string, unknown>, updates: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  
  try {
    const logsStr = sessionStorage.getItem("miudos_tracking_log");
    let logs = [];
    if (logsStr) {
      logs = JSON.parse(logsStr);
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existingIndex = logs.findIndex((l: any) => l.logId === logId);
    
    if (existingIndex >= 0) {
      logs[existingIndex] = { ...logs[existingIndex], ...updates };
    } else {
      logs.push({
        logId,
        eventName,
        eventId,
        params: options,
        timestamp: new Date().toISOString(),
        browserStatus: 'PENDING',
        serverStatus: 'PENDING',
        ...updates
      });
    }
    
    // Keep last 20
    if (logs.length > 20) {
      logs = logs.slice(logs.length - 20);
    }
    
    sessionStorage.setItem("miudos_tracking_log", JSON.stringify(logs));
    window.dispatchEvent(new Event('miudos_tracking_updated'));
  } catch {
    // Ignore storage errors
  }
};

const getCookie = (name: string) => {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return undefined;
};

export const trackEvent = (eventName: string, options: Record<string, unknown> = {}) => {
  if (typeof window === "undefined") return;

  const eventId = generateId();
  const logId = generateId();

  updateInternalLog(logId, eventName, eventId, options, {});

  // 1. Browser Pixel
  const attemptFbq = (delay: number, retriesLeft: number) => {
    setTimeout(() => {
      if (window.fbq) {
        try {
          if (eventName === "Lead" || eventName === "PageView") {
            window.fbq("track", eventName, options, { eventID: eventId });
          } else {
            window.fbq("trackCustom", eventName, options, { eventID: eventId });
          }
          updateInternalLog(logId, eventName, eventId, options, { browserStatus: 'SUCCESS' });
        } catch (err) {
          updateInternalLog(logId, eventName, eventId, options, { browserStatus: 'FAILED', browserError: err instanceof Error ? err.message : String(err) });
        }
      } else if (retriesLeft > 0) {
        const nextDelay = retriesLeft === 3 ? 300 : retriesLeft === 2 ? 700 : 1200;
        attemptFbq(nextDelay, retriesLeft - 1);
      } else {
        updateInternalLog(logId, eventName, eventId, options, { browserStatus: 'FAILED', browserError: "fbq_not_available after retries" });
      }
    }, delay);
  };

  attemptFbq(0, 3);

  // 2. Server-Side CAPI
  try {
    fetch('/api/meta-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        eventName,
        eventId,
        sourceUrl: window.location.href,
        customData: options,
        userAgent: navigator.userAgent,
        fbc: getCookie('_fbc'),
        fbp: getCookie('_fbp'),
        timestamp: new Date().toISOString()
      })
    })
    .then(res => res.json())
    .then(data => {
      updateInternalLog(logId, eventName, eventId, options, { 
        serverStatus: data.success ? 'SUCCESS' : 'FAILED', 
        serverResponse: data 
      });
    })
    .catch(err => {
      updateInternalLog(logId, eventName, eventId, options, { 
        serverStatus: 'FAILED', 
        serverResponse: { error: String(err) } 
      });
    });
  } catch (err) {
    updateInternalLog(logId, eventName, eventId, options, { 
      serverStatus: 'FAILED', 
      serverResponse: { error: String(err) } 
    });
  }
};

let isNavigating = false;

export const handleWhatsAppClick = async (source: string, url: string) => {
  if (isNavigating) return;
  isNavigating = true;

  // Track existing Lead event
  trackEvent("Lead", {
    content_name: "miudos_web_general_whatsapp_group",
    source: source,
    destination: "whatsapp_group_general",
  });

  // Track additional requested events
  trackEvent("LandingCTAClick", { source });
  trackEvent("WhatsAppGroupClick", { source, destination_url: url });

  // Prevent duplicate Lead on the /entrar page
  try {
    sessionStorage.setItem("miudos_lead_fired", "true");
  } catch {
    // Ignore sessionStorage errors
  }

  // Await 800ms before navigating
  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);
    searchParams.set("src", source);
    
    window.location.href = `/entrar?${searchParams.toString()}`;
  } catch {
    window.location.href = `/entrar?src=${source}`;
  }
  
  // Unlock after 1.5s in case the user navigates back quickly or the link fails to open
  setTimeout(() => {
    isNavigating = false;
  }, 1500);
};
