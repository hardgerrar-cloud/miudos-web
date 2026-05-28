"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/tracking";
import { siteConfig } from "@/config/site";
import { ExternalLink, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

function EntrarContent() {
  const searchParams = useSearchParams();
  const source = searchParams.get("src") || "unknown";
  const [copied, setCopied] = useState(false);

  const groupUrl = siteConfig.whatsappGroupUrl;
  
  // Extract group code: https://chat.whatsapp.com/CODE -> CODE
  const groupCodeMatch = groupUrl.match(/chat\.whatsapp\.com\/(.+)/);
  const groupCode = groupCodeMatch ? groupCodeMatch[1] : "";

  const androidIntent = `intent://chat.whatsapp.com/${groupCode}#Intent;scheme=https;package=com.whatsapp;S.browser_fallback_url=${encodeURIComponent(groupUrl)};end`;
  const iosScheme = `whatsapp://chat?code=${groupCode}`;

  useEffect(() => {
    // Fire PageView specific to this redirect page
    trackEvent("WhatsAppRedirectPageView", { source });

    // Delay between 1200ms and 1700ms
    const delay = Math.floor(Math.random() * 500) + 1200;

    const timer = setTimeout(() => {
      const windowGlobal = window as unknown as { opera?: string; MSStream?: unknown };
      const userAgent = navigator.userAgent || navigator.vendor || windowGlobal.opera || "";
      
      if (/android/i.test(userAgent)) {
        trackEvent("WhatsAppOpenAttempt", { source, method: "android_intent" });
        window.location.href = androidIntent;
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !windowGlobal.MSStream) {
        trackEvent("WhatsAppOpenAttempt", { source, method: "ios_whatsapp_scheme" });
        window.location.href = iosScheme;
        
        // Fallback for iOS if scheme fails (browser might just do nothing)
        setTimeout(() => {
          window.location.href = groupUrl;
        }, 1500);
      } else {
        trackEvent("WhatsAppOpenAttempt", { source, method: "universal_link" });
        window.location.href = groupUrl;
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [source, groupUrl, androidIntent, iosScheme]);

  const handleManualOpen = () => {
    trackEvent("WhatsAppManualOpenClick", { source });
    
    try {
      const leadFired = sessionStorage.getItem("miudos_lead_fired");
      if (!leadFired) {
        trackEvent("Lead", {
          content_name: "miudos_web_general_whatsapp_group",
          source: source,
          destination: "whatsapp_group_general",
        });
        sessionStorage.setItem("miudos_lead_fired", "true");
      }
    } catch {
      // Ignore
    }

    setTimeout(() => {
      window.location.href = groupUrl;
    }, 500);
  };

  const handleCopyLink = () => {
    trackEvent("CopyInviteLinkClick", { source });
    navigator.clipboard.writeText(groupUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-primary-dark text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-neon/10 blur-[100px] rounded-full -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center space-y-8"
      >
        <div className="space-y-4">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto border border-white/10 mb-6">
            <span className="text-2xl font-bold text-accent-neon">MW</span>
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Estamos abrindo o grupo no WhatsApp...
          </h1>
          
          <p className="text-gray-400 text-lg">
            Se não abrir automaticamente, toque no botão abaixo.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <button
            onClick={handleManualOpen}
            className="w-full flex justify-center items-center gap-3 bg-accent-neon text-primary-dark px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(0,255,136,0.2)] transition-all hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <ExternalLink className="w-5 h-5" />
            ABRIR WHATSAPP AGORA
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full flex justify-center items-center gap-3 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:bg-white/10"
          >
            {copied ? <Check className="w-5 h-5 text-accent-neon" /> : <Copy className="w-5 h-5" />}
            {copied ? "LINK COPIADO!" : "COPIAR LINK DO GRUPO"}
          </button>
        </div>

        <div className="pt-8">
          <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
            Se estiver usando o navegador do Instagram ou Facebook e o WhatsApp não abrir, copie o link e cole no navegador do celular.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function EntrarClient() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-primary-dark flex items-center justify-center"><div className="w-8 h-8 border-4 border-accent-neon border-t-transparent rounded-full animate-spin"></div></div>}>
      <EntrarContent />
    </Suspense>
  );
}
