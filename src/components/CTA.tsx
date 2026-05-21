"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { handleWhatsAppClick } from "@/lib/tracking";

export default function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-neon/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass max-w-4xl mx-auto p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-accent-neon shadow-[0_0_15px_rgba(0,255,136,0.8)]" />
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Quer receber achados conferidos sem precisar procurar?
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Entre gratuitamente no grupo do Miúdos Web e acompanhe as próximas ofertas direto no WhatsApp.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleWhatsAppClick("final_cta", siteConfig.whatsappGroupUrl)}
            className="inline-flex items-center gap-4 bg-accent-neon text-primary-dark px-12 py-6 rounded-full font-black text-2xl shadow-neon transition-all"
          >
            <MessageCircle className="w-8 h-8" />
            Entrar no grupo agora
          </motion.button>
          
          <p className="mt-8 text-sm text-gray-500 font-medium">
            Grupo silencioso • Só admins enviam • Preços e estoque podem mudar conforme as lojas
          </p>
        </motion.div>
      </div>
    </section>
  );
}
