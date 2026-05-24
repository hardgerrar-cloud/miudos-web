"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";

export default function Transparency() {
  const rules = [
    "O Miúdos Web não é loja.",
    "Não vendemos produtos diretamente.",
    "A compra acontece na Shopee ou em plataformas parceiras.",
    "Alguns links podem ser de afiliado.",
    "Preços, cupons e estoque podem mudar a qualquer momento.",
    "O grupo é gratuito.",
    "Só administradores enviam mensagens.",
    "Você pode sair quando quiser."
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8 md:p-12 border-white/20"
        >
          <div className="flex items-center gap-4 mb-8">
            <Info className="w-8 h-8 text-accent-neon" />
            <h2 className="text-3xl md:text-4xl font-bold">Antes de entrar, deixa eu ser bem claro.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-y-4 gap-x-8">
            {rules.map((rule, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent-neon mt-2 shrink-0" />
                <p className="text-gray-300 text-lg">{rule}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
