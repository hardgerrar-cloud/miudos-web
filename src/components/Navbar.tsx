"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { handleWhatsAppClick } from "@/lib/tracking";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-primary-dark/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        <div className="text-xl font-black tracking-tighter">
          MIÚDOS<span className="text-accent-neon">WEB</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleWhatsAppClick("navbar", siteConfig.whatsappGroupUrl)}
          className="bg-white/5 hover:bg-white/10 text-white px-6 py-2 rounded-full text-sm font-bold border border-white/10 transition-colors flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4 text-accent-neon" />
          Entrar no Grupo
        </motion.button>
      </div>
    </nav>
  );
}
