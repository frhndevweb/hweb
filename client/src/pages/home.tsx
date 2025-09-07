import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import Services from "@/components/landing/services";
import Portfolio from "@/components/landing/portfolio";
import Testimonials from "@/components/landing/testimonials";
import FAQ from "@/components/landing/faq";
import CTA from "@/components/landing/cta";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Features />
      <Services />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
