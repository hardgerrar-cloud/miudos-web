"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { handleWhatsAppClick } from "@/lib/tracking";

export default function CTA() {
  return (
    <section className="relative overflow-hidden border-y border-accent-neon/30 bg-accent-neon/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-neon/10 blur-[150px] rounded-full -z-10" />

      {/* Background Image stretching to the right edge on desktop */}
      <div className="absolute inset-y-0 right-0 w-full md:w-1/2 z-0 hidden md:block">
        <div 
          className="absolute inset-0"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 35%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 35%)'
          }}
        >
          <Image 
            src="/assets/cta-image.png" 
            alt="Achados e Produtos" 
            fill 
            sizes="50vw"
            quality={100}
            className="object-cover object-center" 
          />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-stretch">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="py-16 md:py-32 flex-1 flex flex-col justify-center w-full md:w-1/2 md:pr-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Ou você entra agora, ou continua pagando preço cheio.
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-lg">
              É de graça, é silencioso e é direto ao ponto. Enquanto você pensa, a gente já está garimpando novos achados.
            </p>

            <div className="flex flex-col items-start gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleWhatsAppClick("footer_cta", siteConfig.whatsappGroupUrl)}
                className="inline-flex justify-center items-center gap-3 bg-accent-neon text-primary-dark px-10 py-5 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(0,255,136,0.4)] transition-all hover:shadow-[0_0_50px_rgba(0,255,136,0.6)] w-full sm:w-auto"
              >
                <MessageCircle className="w-6 h-6" />
                CHEGA. EU VOU ENTRAR AGORA.
              </motion.button>
              <p className="text-sm text-gray-400 font-medium mt-2">
                Sai quando quiser… mas acho que você vai ficar.
              </p>
            </div>
          </motion.div>
          
          {/* Spacer for desktop to balance flex layout */}
          <div className="hidden md:block md:w-1/2"></div>
        </div>
      </div>

      {/* Mobile Image (Placed outside container to stretch full width) */}
      <div className="relative w-full h-[400px] sm:h-[500px] md:hidden z-0 mt-8">
        <div 
          className="absolute inset-0"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 30%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 30%)'
          }}
        >
          <Image 
            src="/assets/cta-image.png" 
            alt="Achados e Produtos" 
            fill 
            sizes="100vw"
            quality={100}
            className="object-cover object-top" 
          />
        </div>
      </div>
    </section>
  );
}
