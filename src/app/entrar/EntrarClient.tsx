"use client";

import { useEffect, useState, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/tracking";
import { siteConfig } from "@/config/site";
import { Copy, Check, RefreshCw, Globe } from "lucide-react";
import { motion } from "framer-motion";

function EntrarContent() {
  const searchParams = useSearchParams();
  const source = searchParams.get("src") || "unknown";
  const [copied, setCopied] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const groupUrl = siteConfig.whatsappGroupUrl;
  
  // Extract group code: https://chat.whatsapp.com/CODE -> CODE
  const groupCodeMatch = groupUrl.match(/chat\.whatsapp\.com\/(.+)/);
  const groupCode = groupCodeMatch ? groupCodeMatch[1] : "";

  const openWhatsApp = useCallback((isRetry = false) => {
    if (isRetry) {
      trackEvent("WhatsAppOpenRetryClick", { source });
    }

    const windowGlobal = window as unknown as { opera?: string; MSStream?: unknown };
    const userAgent = navigator.userAgent || navigator.vendor || windowGlobal.opera || "";
    
    // We want the fallback to be our own page, so they don't get stuck in play store / web whatsapp
    const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}?fallback=1` : '';
    const encodedFallback = encodeURIComponent(currentUrl);

    const androidIntent = `intent://chat.whatsapp.com/${groupCode}#Intent;scheme=https;package=com.whatsapp;S.browser_fallback_url=${encodedFallback};end`;
    const iosScheme = `whatsapp://chat?code=${groupCode}`;

    if (/android/i.test(userAgent)) {
      trackEvent("WhatsAppOpenAttempt", { source, method: "android_intent", retry: isRetry });
      window.location.href = androidIntent;
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !windowGlobal.MSStream) {
      trackEvent("WhatsAppOpenAttempt", { source, method: "ios_whatsapp_scheme", retry: isRetry });
      window.location.href = iosScheme;
      // Removido o fallback automático para groupUrl no iOS para manter o usuário na nossa página
    } else {
      trackEvent("WhatsAppOpenAttempt", { source, method: "universal_link", retry: isRetry });
      window.location.href = groupUrl; // Desktop or other OS, directly opening universal link is fine
    }
  }, [groupCode, groupUrl, source]);

  useEffect(() => {
    // Fire PageView specific to this redirect page
    trackEvent("WhatsAppRedirectPageView", { source });

    const isFallback = searchParams.get("fallback") === "1";
    if (isFallback) {
      trackEvent("WhatsAppFallbackShown", { source });
    }

    // Lead tracking
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

    if (!isFallback) {
      // Delay between 1200ms and 1700ms for initial attempt
      const delay = Math.floor(Math.random() * 500) + 1200;
      const timer = setTimeout(() => {
        openWhatsApp(false);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [source, openWhatsApp, searchParams]);

  const handleManualOpen = () => {
    trackEvent("WhatsAppManualOpenClick", { source });
    setAttemptCount(prev => prev + 1);
    openWhatsApp(true);
  };

  const handleCopyLink = () => {
    trackEvent("CopyInviteLinkClick", { source });
    navigator.clipboard.writeText(groupUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBrowserFallbackClick = () => {
    trackEvent("WhatsAppBrowserFallbackClick", { source });
    window.location.href = groupUrl;
  };

  return (
    <div className="min-h-screen bg-primary-dark text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-neon/10 blur-[100px] rounded-full -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center space-y-6"
      >
        <div className="space-y-4">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto border border-white/10 mb-4">
            <span className="text-2xl font-bold text-accent-neon">MW</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
            Estamos abrindo o grupo no WhatsApp...
          </h1>
          
          <div className="bg-accent-neon/10 border border-accent-neon/20 rounded-xl p-4 text-left space-y-3">
            <p className="text-accent-neon font-medium text-center mb-2">
              Quando aparecer o aviso, toque em <strong className="font-bold">CONTINUAR</strong> para abrir o grupo.
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <div className="bg-white/10 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 shrink-0">1</div>
                <p>Toque em <strong>Abrir WhatsApp</strong> ou no botão abaixo</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-white/10 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 shrink-0">2</div>
                <p>Quando o celular perguntar, toque em <strong>Continuar</strong></p>
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-sm">
            Se você tocar em Cancelar, tudo bem. É só apertar o botão abaixo e tentar novamente.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={handleManualOpen}
            className="w-full flex justify-center items-center gap-2 bg-accent-neon text-primary-dark px-6 py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(0,255,136,0.2)] transition-all hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <RefreshCw className="w-5 h-5" />
            {attemptCount > 0 ? "TENTAR ABRIR DE NOVO" : "ABRIR WHATSAPP AGORA"}
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full flex justify-center items-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3.5 rounded-xl font-bold transition-all hover:bg-white/10"
          >
            {copied ? <Check className="w-5 h-5 text-accent-neon" /> : <Copy className="w-5 h-5" />}
            {copied ? "LINK COPIADO!" : "COPIAR LINK DO GRUPO"}
          </button>
        </div>

        <div className="pt-4 space-y-4">
          <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
            Se não abrir, copie o link e cole no navegador do celular ou envie para você mesmo no WhatsApp.
          </p>

          <button
            onClick={handleBrowserFallbackClick}
            className="w-full flex justify-center items-center gap-2 text-gray-500 text-xs hover:text-white transition-colors"
          >
            <Globe className="w-3 h-3" />
            ABRIR LINK PELO NAVEGADOR
          </button>
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
