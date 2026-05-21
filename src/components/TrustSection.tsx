"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Info, XCircle, Users } from "lucide-react";

const trustItems = [
  {
    icon: Users,
    text: "O Miúdos Web é um grupo de achadinhos, não somos uma loja.",
  },
  {
    icon: ShieldCheck,
    text: "A compra acontece de forma segura na Shopee ou plataforma parceira.",
  },
  {
    icon: Info,
    text: "Preços, cupons e estoque podem mudar conforme a disponibilidade da loja.",
  },
  {
    icon: ShieldCheck,
    text: "O grupo é 100% gratuito e você pode sair quando quiser.",
  },
  {
    icon: XCircle,
    text: "Grupo silencioso: só administradores enviam mensagens.",
  },
];

export default function TrustSection() {
  return (
    <section className="py-24 bg-primary-dark/80 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparência antes de você entrar</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Queremos que você saiba exatamente como funcionamos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-6 glass rounded-2xl"
            >
              <div className="flex-shrink-0 mt-1">
                <item.icon className="w-6 h-6 text-accent-neon" />
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
