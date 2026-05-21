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

export const handleWhatsAppClick = (source: string, url: string) => {
  trackEvent("WhatsAppGroupClick", { source, destination: "whatsapp_group" });
  trackEvent("Lead", { content_name: "whatsapp_group_join" });

  setTimeout(() => {
    window.location.href = url;
  }, 200);
};
