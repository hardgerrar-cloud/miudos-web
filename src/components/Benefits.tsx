"use client";

import { motion } from "framer-motion";
import { ShieldCheck, BellOff, Zap, LayoutGrid } from "lucide-react";

const benefits = [
  {
    title: "Achados conferidos",
    description: "Antes de enviar, verificamos se a oferta faz sentido e se o link leva para uma plataforma confiável.",
    icon: ShieldCheck,
    color: "text-orange-500",
  },
  {
    title: "Sem bagunça",
    description: "O grupo é silencioso: apenas administradores enviam mensagens.",
    icon: BellOff,
    color: "text-blue-500",
  },
  {
    title: "Você acompanha primeiro",
    description: "Quem entra no grupo vê as novas ofertas assim que elas são publicadas.",
    icon: Zap,
    color: "text-accent-neon",
  },
  {
    title: "Tudo em um lugar",
    description: "Roupas, beleza, casa, tecnologia e utilidades reunidos em um só grupo.",
    icon: LayoutGrid,
    color: "text-purple-500",
  },
];

export default function Benefits() {
  return (
    <section className="py-24 bg-primary-dark/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Por que entrar?</h2>
          <p className="text-gray-400">Um grupo organizado para quem quer economizar de verdade.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 hover:border-accent-neon/30 transition-colors group"
            >
              <div className={`mb-6 p-4 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform`}>
                <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
