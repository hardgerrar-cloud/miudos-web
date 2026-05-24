"use client";

import { motion } from "framer-motion";
import { Tag, Shirt, Sparkles, Home, Laptop, TicketPercent, Zap } from "lucide-react";

export default function WhatToExpect() {
  const items = [
    { icon: Shirt, label: "Moda e roupas" },
    { icon: Sparkles, label: "Beleza e cuidados" },
    { icon: Home, label: "Casa e utilidades" },
    { icon: Laptop, label: "Tecnologia e acessórios" },
    { icon: TicketPercent, label: "Cupons da Shopee" },
    { icon: Zap, label: "Bugs de preço quando aparecem" },
    { icon: Tag, label: "Achadinhos para o dia a dia" },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">O que pode aparecer por lá?</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex flex-wrap gap-4">
              {items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="glass px-6 py-4 flex items-center gap-3 w-fit"
                  >
                    <Icon className="w-5 h-5 text-accent-neon" />
                    <span className="font-medium text-lg">{item.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-8 border-l-4 border-accent-neon"
            >
              <p className="text-xs font-bold text-accent-neon mb-2 uppercase tracking-wider">Exemplo Real</p>
              <h3 className="text-2xl font-bold mb-2">Calça jeans</h3>
              <p className="text-gray-400 line-through">De R$ 139,75</p>
              <p className="text-3xl font-black text-white">por R$ 115,99</p>
              <p className="text-xs text-gray-500 mt-4">
                Exemplo de achado recente. Preço sujeito a alteração conforme estoque, cupom e loja parceira.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass p-8 border-l-4 border-yellow-500"
            >
              <p className="text-xs font-bold text-yellow-500 mb-2 uppercase tracking-wider">Ocasionalmente</p>
              <h3 className="text-2xl font-bold mb-2">Bug de cafeteira por R$ 1</h3>
              <p className="text-sm text-gray-400 mt-2">
                Quando bugs aparecem, avisamos rápido. Disponibilidade pode acabar em poucos minutos e depende da loja.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
