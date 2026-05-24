"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { handleWhatsAppClick } from "@/lib/tracking";

export default function Hero() {
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
              <span className="px-3 py-1 text-xs font-bold bg-white/5 border border-white/10 rounded-full">100% gratuito</span>
              <span className="px-3 py-1 text-xs font-bold bg-white/5 border border-white/10 rounded-full">Zero flood</span>
              <span className="px-3 py-1 text-xs font-bold bg-white/5 border border-white/10 rounded-full">Só admins enviam</span>
              <span className="px-3 py-1 text-xs font-bold bg-white/5 border border-white/10 rounded-full">Achados conferidos</span>
              <span className="px-3 py-1 text-xs font-bold bg-white/5 border border-white/10 rounded-full">+50 grupos criados</span>
              <span className="px-3 py-1 text-xs font-bold bg-white/5 border border-white/10 rounded-full">Preços podem mudar</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-white tracking-tight">
              Você ainda tá pagando caro porque procura sozinho.
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-xl">
              O Miúdos Web garimpa achados, cupons e promoções em lojas parceiras e manda tudo em um grupo gratuito, silencioso e organizado no WhatsApp.
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
                  CHEGA. QUERO ENTRAR NO GRUPO.
                </motion.button>
              </div>
              <p className="text-sm text-gray-500 pl-2">
                <ShieldCheck className="w-4 h-4 inline-block mr-1 -mt-1 text-accent-neon" />
                Você será enviado para o WhatsApp. Sai quando quiser… mas acho que você vai ficar.
              </p>
            </div>

            <div className="mt-12 flex items-center gap-4">
              <span className="text-lg text-gray-400">
                Grupo nº 51 do Miúdos Web. Mais de <span className="text-accent-neon font-bold">50 mil pessoas</span> somadas nos nossos grupos de achados.
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
                <p className="text-xs font-bold text-accent-neon">NOVO GRUPO ABERTO</p>
                <p className="text-sm font-medium">Acesso liberado agora</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
