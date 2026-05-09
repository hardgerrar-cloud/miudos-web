"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const products = [
  {
    name: "Fone Bluetooth Premium",
    oldPrice: "R$ 599,00",
    newPrice: "R$ 329,00",
    discount: "-45%",
    image: "/assets/product-headphones.png",
  },
  {
    name: "Smartwatch Series X",
    oldPrice: "R$ 299,00",
    newPrice: "R$ 199,00",
    discount: "-30%",
    image: "/assets/product-smartwatch.png",
  },
  {
    name: "Gadget Inteligente",
    oldPrice: "R$ 159,00",
    newPrice: "R$ 79,50",
    discount: "-50%",
    image: "/assets/product-gadget.png",
  },
];

export default function Products() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-neon/5 blur-[150px] rounded-full -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">O que você vai encontrar</h2>
          <p className="text-gray-400">Exemplos de achadinhos que enviamos diariamente.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 group hover:bg-white/[0.08] transition-all"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5 mb-6 flex items-center justify-center p-8">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="object-contain group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-accent-neon text-primary-dark font-black text-xs px-3 py-1 rounded-full">
                  {product.discount}
                </div>
              </div>

              <h3 className="text-lg font-bold mb-2">{product.name}</h3>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 line-through text-sm">{product.oldPrice}</span>
                <span className="text-accent-neon font-bold text-xl">{product.newPrice}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
