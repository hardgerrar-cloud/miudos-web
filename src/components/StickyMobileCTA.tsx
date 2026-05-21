"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { handleWhatsAppClick } from "@/lib/tracking";

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 w-full z-40 p-4 md:hidden bg-gradient-to-t from-primary-dark via-primary-dark/90 to-transparent pb-6 pt-12 pointer-events-none"
        >
          <button
            onClick={() => handleWhatsAppClick("sticky_mobile", siteConfig.whatsappGroupUrl)}
            className="w-full flex flex-col items-center justify-center gap-1 bg-accent-neon text-primary-dark py-4 px-6 rounded-full font-black text-lg shadow-[0_0_20px_rgba(0,255,136,0.4)] pointer-events-auto"
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Entrar no grupo gratuito
            </div>
            <span className="text-[11px] font-semibold opacity-80 uppercase tracking-wider">
              Grupo silencioso
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
