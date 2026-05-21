"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

const searches = [
  "Achados de roupa feminina e masculina",
  "Produtos úteis para casa",
  "Beleza e cuidados",
  "Tecnologia e acessórios",
  "Cupons e oportunidades pontuais"
];

export default function SocialProof() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">O que as pessoas procuram no grupo</h2>
          <p className="text-gray-400">Junte-se a milhares de pessoas que já economizam diariamente.</p>
        </div>

        <div className="max-w-3xl mx-auto glass p-8 md:p-12 rounded-3xl">
          <div className="flex flex-col gap-6">
            {searches.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 border-b border-white/5 pb-6 last:border-0 last:pb-0"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Search className="w-5 h-5 text-accent-neon" />
                </div>
                <p className="text-lg md:text-xl font-medium text-gray-200">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
