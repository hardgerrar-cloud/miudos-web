import { Metadata } from "next";
import EntrarClient from "./EntrarClient";

export const metadata: Metadata = {
  title: "Entrando no grupo... | Miúdos Web",
  description: "Aguarde enquanto redirecionamos você para o grupo do WhatsApp do Miúdos Web.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EntrarPage() {
  return <EntrarClient />;
}
