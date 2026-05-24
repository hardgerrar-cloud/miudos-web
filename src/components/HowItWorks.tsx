"use client";

import { motion } from "framer-motion";
import { Search, Filter, CheckCircle2 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "A gente vai primeiro",
      description: "Todo dia a equipe do Miúdos Web procura achados, cupons, promoções e oportunidades em lojas e plataformas parceiras. Enquanto muita gente ainda está procurando, a gente já está filtrando.",
    },
    {
      icon: Filter,
      title: "A gente filtra o que presta",
      description: "Oferta fraca, desconto maquiado ou link duvidoso não é o foco. A ideia é mandar achados que realmente façam sentido para quem quer economizar.",
    },
    {
      icon: CheckCircle2,
      title: "Você só acompanha",
      description: "Quando aparecer uma oportunidade boa, ela vai para o grupo. Você clica, confere na plataforma parceira e decide se quer aproveitar.",
    },
  ];

  return (
    <section id="como-funciona" className="py-24 relative overflow-hidden bg-black/20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Como funciona o nosso grupo
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Direto ao ponto. A gente garimpa, filtra e manda. Você só aproveita.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                {/* Connecting Line (Desktop Only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-accent-neon to-transparent opacity-30 z-0" />
                )}

                <div className="glass p-8 h-full relative z-10 hover:bg-white/10 transition-colors flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-accent-neon/20 rounded-2xl flex items-center justify-center mb-6 border border-accent-neon/30 text-accent-neon">
                    <Icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed flex-1">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl font-bold text-accent-neon tracking-wide">
            O trabalho chato é nosso. O botão é seu.
          </p>
        </div>
      </div>
    </section>
  );
}
