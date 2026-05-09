"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

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
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Os melhores achadinhos da internet em um só lugar.
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-xl">
              Entre gratuitamente nos grupos do Miúdos Web e receba promoções reais, produtos úteis e ofertas selecionadas diariamente.
            </p>

            <div className="space-y-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://chat.whatsapp.com/G2exRfPG5465YtpgegKztV"
                className="inline-flex items-center gap-3 bg-accent-neon text-primary-dark px-10 py-5 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]"
              >
                <MessageCircle className="w-6 h-6" />
                Entrar no Grupo VIP
              </motion.a>
              <p className="text-sm text-gray-500 pl-4">
                100% gratuito • Sem spam • Ofertas selecionadas diariamente
              </p>
            </div>

            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-primary-dark overflow-hidden bg-gray-800">
                    <Image
                      src={`/assets/avatar-${i % 2 === 0 ? 2 : 1}.png`}
                      alt="User"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-400">
                Mais de <span className="text-accent-neon font-bold">5.000 pessoas</span> economizando hoje
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
                <p className="text-xs font-bold text-accent-neon">OFERTA ENVIADA AGORA</p>
                <p className="text-sm font-medium">iPhone 15 com 30% OFF</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
