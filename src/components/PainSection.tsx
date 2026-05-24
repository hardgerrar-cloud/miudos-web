"use client";

import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { handleWhatsAppClick } from "@/lib/tracking";
import { siteConfig } from "@/config/site";

export default function PainSection() {
  const painPoints = [
    "Você perde tempo rolando vários apps.",
    "Entra em grupo cheio de spam.",
    "Vê a oferta depois que acabou.",
    "Compra caro e depois descobre que tinha cupom.",
    "Acha que está economizando, mas podia pagar menos."
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Você ia garimpar promoção mesmo?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400"
          >
            Vamos ser sinceros: você não ia. E quando ia, provavelmente já era tarde.
          </motion.p>
        </div>

        <div className="grid gap-4 mb-12">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 flex items-center gap-4 text-lg md:text-xl font-medium text-gray-300 hover:bg-white/10 transition-colors"
            >
              <XCircle className="w-8 h-8 text-red-500 shrink-0" />
              <p>{point}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleWhatsAppClick("pain_section", siteConfig.whatsappGroupUrl)}
            className="inline-block bg-accent-neon text-primary-dark px-10 py-5 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]"
          >
            TÁ, ME CONVENCEU. EU VOU ENTRAR.
          </motion.button>
        </div>
      </div>
    </section>
  );
}
