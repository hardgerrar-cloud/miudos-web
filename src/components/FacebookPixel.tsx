"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/tracking";

export default function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Refs to track if events fired
  const engagedFired = useRef(false);
  const scrollFired = useRef(false);
  const qualityFired = useRef(false);
  
  // Track timers and states for QualityVisit
  const timeSpentRef = useRef(0);
  const reachedHalfScrollRef = useRef(false);

  useEffect(() => {
    // Fire PageView on route change
    trackEvent("PageView");

    // Reset tracking states for new page loads
    engagedFired.current = false;
    scrollFired.current = false;
    qualityFired.current = false;
    timeSpentRef.current = 0;
    reachedHalfScrollRef.current = false;

    // Timer for 15s (EngagedVisit)
    const engagedTimer = setTimeout(() => {
      if (!engagedFired.current) {
        trackEvent("EngagedVisit", { seconds: 15, page: window.location.pathname });
        engagedFired.current = true;
      }
    }, 15000);

    // Timer to track seconds for QualityVisit (at least 20s)
    const qualityInterval = setInterval(() => {
      timeSpentRef.current += 1;
      
      if (timeSpentRef.current >= 20 && reachedHalfScrollRef.current && !qualityFired.current) {
        trackEvent("QualityVisit", { seconds: 20, scroll_percent: 50, page: window.location.pathname });
        qualityFired.current = true;
        clearInterval(qualityInterval);
      }
    }, 1000);

    // Scroll listener for 50% scroll
    const handleScroll = () => {
      if (scrollFired.current && reachedHalfScrollRef.current) return;

      const scrollPosition = window.scrollY + window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;
      const scrollPercentage = scrollPosition / totalHeight;

      if (scrollPercentage >= 0.5) {
        reachedHalfScrollRef.current = true;

        if (!scrollFired.current) {
          trackEvent("ScrollDepth", { percent: 50, page: window.location.pathname });
          scrollFired.current = true;
        }

        // Check if time condition (20s) is already met
        if (timeSpentRef.current >= 20 && !qualityFired.current) {
          trackEvent("QualityVisit", { seconds: 20, scroll_percent: 50, page: window.location.pathname });
          qualityFired.current = true;
          clearInterval(qualityInterval);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(engagedTimer);
      clearInterval(qualityInterval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, searchParams]);

  return (
    <Script
      id="fb-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${siteConfig.pixelId}');
          fbq('track', 'PageView');
        `,
      }}
    />
  );
}
