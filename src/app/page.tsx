import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Products from "@/components/Products";
import HowItWorks from "@/components/HowItWorks";
import SocialProof from "@/components/SocialProof";
import TrustSection from "@/components/TrustSection";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export default function Home() {
  return (
    <main className="min-height-screen">
      <Navbar />
      <Hero />
      <Benefits />
      <Products />
      <HowItWorks />
      <SocialProof />
      <TrustSection />
      <FAQ />
      <CTA />
      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
