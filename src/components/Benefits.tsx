"use client";

import { motion } from "framer-motion";
import { Flame, ShoppingCart, Zap, ShieldCheck } from "lucide-react";

const benefits = [
  {
    title: "Promoções Reais",
    description: "Selecionamos apenas ofertas que realmente valem a pena.",
    icon: Flame,
    color: "text-orange-500",
  },
  {
    title: "Achados Úteis",
    description: "Produtos que facilitam seu dia a dia e tecnologia de ponta.",
    icon: ShoppingCart,
    color: "text-blue-500",
  },
  {
    title: "Ofertas Rápidas",
    description: "Receba links exclusivos antes de todo mundo.",
    icon: Zap,
    color: "text-accent-neon",
  },
  {
    title: "Comunidade Confiável",
    description: "Grupo limpo, organizado e focado em economia real.",
    icon: ShieldCheck,
    color: "text-purple-500",
  },
];

export default function Benefits() {
  return (
    <section className="py-24 bg-primary-dark/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Por que entrar no Miúdos Web?</h2>
          <p className="text-gray-400">Curadoria profissional para sua economia inteligente.</p>
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
