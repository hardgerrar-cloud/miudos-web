"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { handleWhatsAppClick } from "@/lib/tracking";

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the first 400px (hero section roughly)
      if (window.scrollY > 400) {
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
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 p-4 md:hidden z-50 bg-gradient-to-t from-primary-dark via-primary-dark/90 to-transparent pb-6 pt-10"
        >
          <button
            onClick={() => handleWhatsAppClick("sticky_mobile", siteConfig.whatsappGroupUrl)}
            className="w-full flex justify-center items-center gap-2 bg-accent-neon text-primary-dark px-6 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(0,255,136,0.3)] animate-pulse-glow"
          >
            <MessageCircle className="w-6 h-6" />
            ENTRAR NO GRUPO
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
