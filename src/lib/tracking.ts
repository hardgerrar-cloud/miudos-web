declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const trackEvent = (eventName: string, options: Record<string, unknown> = {}) => {
  if (typeof window !== "undefined" && window.fbq) {
    if (eventName === "Lead" || eventName === "PageView") {
      window.fbq("track", eventName, options);
    } else {
      window.fbq("trackCustom", eventName, options);
    }
  } else {
    console.warn(`[Pixel Event Missed] ${eventName}`, options);
  }
};

let isNavigating = false;

export const handleWhatsAppClick = (source: string, url: string) => {
  if (isNavigating) return;
  isNavigating = true;

  trackEvent("Lead", {
    content_name: "miudos_web_general_whatsapp_group",
    source: source,
    destination: "whatsapp_group_general",
  });

  setTimeout(() => {
    window.location.href = url;
    
    // Unlock after 1.5s in case the user navigates back quickly or the link fails to open
    setTimeout(() => {
      isNavigating = false;
    }, 1500);
  }, 200);
};
