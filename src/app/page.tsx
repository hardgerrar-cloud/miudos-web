import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AnimatedMarquee from "@/components/AnimatedMarquee";
import PainSection from "@/components/PainSection";
import HowItWorks from "@/components/HowItWorks";
import Comparison from "@/components/Comparison";
import SocialProof from "@/components/SocialProof";
import BrandsMarquee from "@/components/BrandsMarquee";
import WhatToExpect from "@/components/WhatToExpect";
import Testimonials from "@/components/Testimonials";
import Transparency from "@/components/Transparency";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import FacebookPixel from "@/components/FacebookPixel";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-primary-dark">
      <Suspense fallback={null}>
        <FacebookPixel />
      </Suspense>
      <Navbar />
      <Hero />
      <AnimatedMarquee />
      <PainSection />
      <HowItWorks />
      <Comparison />
      <SocialProof />
      <BrandsMarquee />
      <WhatToExpect />
      <Testimonials />
      <Transparency />
      <CTA />
      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
