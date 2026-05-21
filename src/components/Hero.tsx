"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { handleWhatsAppClick } from "@/lib/tracking";
import { useEffect, useState } from "react";

export default function Hero() {
  const [memberCount, setMemberCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const target = 24235;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setMemberCount(target);
        clearInterval(timer);
      } else {
        setMemberCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-neon/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-neon/5 blur-[100px] rounded-full -z-10" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 text-xs font-bold bg-white/5 border border-white/10 rounded-full">100% Gratuito</span>
              <span className="px-3 py-1 text-xs font-bold bg-white/5 border border-white/10 rounded-full">Grupo Silencioso</span>
              <span className="px-3 py-1 text-xs font-bold bg-white/5 border border-white/10 rounded-full">Só admins enviam</span>
              <span className="px-3 py-1 text-xs font-bold bg-white/5 border border-white/10 rounded-full">Ofertas conferidas</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Achadinhos conferidos direto no seu WhatsApp.
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-xl">
              Entre gratuitamente no grupo do Miúdos Web e receba ofertas de roupas, beleza, casa, tecnologia e utilidades em um grupo privado, silencioso e organizado.
            </p>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleWhatsAppClick("hero", siteConfig.whatsappGroupUrl)}
                  className="inline-flex justify-center items-center gap-3 bg-accent-neon text-primary-dark px-10 py-5 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]"
                >
                  <MessageCircle className="w-6 h-6" />
                  Entrar no grupo agora
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#como-funciona"
                  className="inline-flex justify-center items-center gap-3 bg-white/5 text-white border border-white/10 px-10 py-5 rounded-full font-bold text-lg transition-all hover:bg-white/10"
                >
                  Ver como funciona
                </motion.a>
              </div>
              <p className="text-sm text-gray-500 pl-2">
                <ShieldCheck className="w-4 h-4 inline-block mr-1 -mt-1 text-accent-neon" />
                Você será redirecionado para o WhatsApp. Sem spam.
              </p>
            </div>

            <div className="mt-12 flex items-center gap-4">
              <span className="text-lg text-gray-400">
                Mais de <span className="text-accent-neon font-bold">{memberCount.toLocaleString('pt-BR')} pessoas</span> aguardam ofertas
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/assets/hero-character.png"
                alt="Miúdos Web Hero"
                width={600}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>

            {/* Floating Notification */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 z-20 glass p-5 flex items-center gap-4 max-w-[280px]"
            >
              <div className="w-3 h-3 bg-accent-neon rounded-full animate-pulse" />
              <div>
                <p className="text-xs font-bold text-accent-neon">EXEMPLO DE ACHADO</p>
                <p className="text-sm font-medium">Calça Jeans por R$ 115,99</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
