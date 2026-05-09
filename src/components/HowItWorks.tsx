"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Entre no grupo",
    description: "Clique no botão e entre em um de nossos grupos gratuitos.",
  },
  {
    title: "Receba ofertas",
    description: "Nossa curadoria envia os melhores achados em tempo real.",
  },
  {
    title: "Aproveite",
    description: "Garanta o menor preço antes que o estoque acabe.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Como Funciona</h2>
          <p className="text-gray-400">Três passos simples para você economizar.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-10 glass"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 bg-accent-neon text-primary-dark rounded-full flex items-center justify-center font-bold text-xl mb-6">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
