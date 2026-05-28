declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

const logInternalEvent = (eventName: string, options: Record<string, unknown> = {}, fbqExists: boolean, error?: string) => {
  if (typeof window === "undefined") return;
  
  try {
    const logsStr = sessionStorage.getItem("miudos_tracking_log");
    let logs = [];
    if (logsStr) {
      logs = JSON.parse(logsStr);
    }
    
    logs.push({
      eventName,
      params: options,
      timestamp: new Date().toISOString(),
      fbqExists,
      error
    });
    
    // Keep last 20
    if (logs.length > 20) {
      logs = logs.slice(logs.length - 20);
    }
    
    sessionStorage.setItem("miudos_tracking_log", JSON.stringify(logs));
    
    // Dispatch a custom event so the debug component can update in real-time
    window.dispatchEvent(new Event('miudos_tracking_updated'));
  } catch {
    // Ignore storage errors
  }
};

const executeFbq = (eventName: string, options: Record<string, unknown>) => {
  if (eventName === "Lead" || eventName === "PageView") {
    window.fbq!("track", eventName, options);
  } else {
    window.fbq!("trackCustom", eventName, options);
  }
};

export const trackEvent = (eventName: string, options: Record<string, unknown> = {}) => {
  if (typeof window === "undefined") return;

  const attemptFbq = (delay: number, retriesLeft: number) => {
    setTimeout(() => {
      if (window.fbq) {
        try {
          executeFbq(eventName, options);
          logInternalEvent(eventName, options, true);
        } catch (err) {
          logInternalEvent(eventName, options, true, err instanceof Error ? err.message : String(err));
        }
      } else if (retriesLeft > 0) {
        // Next delays: 300ms, 700ms, 1200ms
        const nextDelay = retriesLeft === 3 ? 300 : retriesLeft === 2 ? 700 : 1200;
        attemptFbq(nextDelay, retriesLeft - 1);
      } else {
        console.warn(`[Pixel Event Missed] ${eventName}`, options);
        logInternalEvent(eventName, options, false, "fbq_not_available after retries");
      }
    }, delay);
  };

  attemptFbq(0, 3);
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
