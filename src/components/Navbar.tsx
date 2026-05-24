"use client";

import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import { siteConfig } from "@/config/site";
import { handleWhatsAppClick } from "@/lib/tracking";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass rounded-none border-t-0 border-x-0 border-b-white/10 bg-primary-dark/80 supports-[backdrop-filter]:bg-primary-dark/60">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-accent-neon rounded-xl flex items-center justify-center rotate-3 text-primary-dark shadow-[0_0_15px_rgba(0,255,136,0.4)]">
            <Tag className="w-6 h-6 font-bold" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Miúdos Web</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-6"
        >
          <button 
            onClick={() => handleWhatsAppClick("navbar", siteConfig.whatsappGroupUrl)}
            className="hidden md:inline-flex bg-accent-neon text-primary-dark px-6 py-2 rounded-full font-bold text-sm shadow-[0_0_15px_rgba(0,255,136,0.3)] transition-all hover:shadow-[0_0_25px_rgba(0,255,136,0.5)] hover:scale-105"
          >
            ENTRAR NO GRUPO
          </button>
        </motion.div>
      </div>
    </nav>
  );
}
