import { Categories } from "@/components/landing/Categories";
import { CtaBand } from "@/components/landing/CtaBand";
import { FeatureHighlight } from "@/components/landing/FeatureHighlight";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TrustedBy } from "@/components/landing/TrustedBy";
import { Vision } from "@/components/landing/Vision";
import { WhatWeDo } from "@/components/landing/WhatWeDo";
import { Navbar } from "@/components/layout/Navbar";

export function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Categories />
      <FeatureHighlight />
      <CtaBand />
      <HowItWorks />
      <Vision />
      <WhatWeDo />
      <TrustedBy />
      <Footer />
    </main>
  );
}
