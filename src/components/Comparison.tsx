"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import Image from "next/image";
import { handleWhatsAppClick } from "@/lib/tracking";
import { siteConfig } from "@/config/site";

export default function Comparison() {
  const semMiudos = [
    "Paga preço cheio sem saber que tinha oferta.",
    "Passa horas procurando e acha pouca coisa boa.",
    "Entra em grupos bagunçados com spam.",
    "Perde cupom e promoção rápida.",
    "Descobre o achado quando já acabou.",
    "Fica pulando de app em app tentando economizar."
  ];

  const comMiudos = [
    "Recebe achados organizados direto no WhatsApp.",
    "Grupo silencioso: só admins enviam.",
    "Links e ofertas conferidos antes de serem enviados.",
    "Acompanha moda, casa, beleza, tecnologia e utilidades.",
    "Entra em um projeto com mais de 50 grupos criados.",
    "Vê oportunidades assim que forem publicadas no grupo."
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-black/40">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">A diferença é simples</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Sem o Miúdos Web vs. com o Miúdos Web. Você decide. Mas uma das escolhas parece bem mais inteligente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Sem o Miúdos Web */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8 border-red-500/20 bg-red-950/10 flex flex-col"
          >
            <div className="w-full aspect-square relative rounded-xl overflow-hidden mb-8 border border-red-500/20">
               <Image src="/assets/sem-miudos.png" alt="Sem o Miúdos Web" fill className="object-cover" />
            </div>
            <h3 className="text-2xl font-bold mb-8 text-center text-red-400">Sem o Miúdos Web</h3>
            <ul className="space-y-6">
              {semMiudos.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 bg-red-500/20 p-1 rounded-full shrink-0">
                    <X className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="text-gray-300 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Com o Miúdos Web */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass p-8 border-accent-neon/30 bg-accent-neon/5 relative overflow-hidden flex flex-col"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-neon/10 blur-[50px] -z-10" />
            <div className="w-full aspect-square relative rounded-xl overflow-hidden mb-8 border border-accent-neon/30 shadow-[0_0_15px_rgba(0,255,136,0.2)]">
               <Image src="/assets/com-miudos.png" alt="Com o Miúdos Web" fill className="object-cover" />
            </div>
            <h3 className="text-2xl font-bold mb-8 text-center text-accent-neon text-glow">Com o Miúdos Web</h3>
            <ul className="space-y-6">
              {comMiudos.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 bg-accent-neon/20 p-1 rounded-full shrink-0">
                    <Check className="w-5 h-5 text-accent-neon" />
                  </div>
                  <span className="text-white text-lg font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleWhatsAppClick("comparison", siteConfig.whatsappGroupUrl)}
            className="inline-block bg-accent-neon text-primary-dark px-10 py-5 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]"
          >
            ENTENDI. ME COLOCA NO GRUPO.
          </motion.button>
        </div>
      </div>
    </section>
  );
}
