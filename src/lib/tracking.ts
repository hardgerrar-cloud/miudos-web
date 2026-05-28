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

  // Increased timeout to 600ms to ensure the pixel request has time to complete on mobile
  setTimeout(() => {
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
  }, 600);
};
