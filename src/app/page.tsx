import dynamic from 'next/dynamic';
import UrgencyBanner from "@/components/ui/urgency-banner";
import InfiniteHero from "@/components/ui/infinite-hero";
import LevelerCard from "@/components/ui/leveler-card";
import FadeIn from "@/components/ui/fade-in";

// Lazy load below-the-fold components
const Benefits = dynamic(() => import("@/components/ui/benefits"));
const Testimonials = dynamic(() => import("@/components/ui/testimonials"));
const LearningCTA = dynamic(() => import("@/components/ui/learning-cta"));
const Modules = dynamic(() => import("@/components/ui/modules"));
const Investment = dynamic(() => import("@/components/ui/investment"));
const Pricing = dynamic(() => import("@/components/ui/pricing"));
const Guarantee = dynamic(() => import("@/components/ui/guarantee"));
const FAQ = dynamic(() => import("@/components/ui/faq"));
const FinalCTA = dynamic(() => import("@/components/ui/final-cta"));
const Footer = dynamic(() => import("@/components/ui/footer"));

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <UrgencyBanner />
      <InfiniteHero />

      <FadeIn direction="up" delay={0.1}>
        <LevelerCard />
      </FadeIn>

      <FadeIn direction="up" delay={0}>
        <Benefits />
      </FadeIn>

      <FadeIn direction="left" delay={0.1}>
        <Testimonials />
      </FadeIn>

      <FadeIn direction="up" delay={0.1}>
        <LearningCTA />
      </FadeIn>

      <FadeIn direction="right" delay={0.1}>
        <Modules />
      </FadeIn>

      <FadeIn direction="up" delay={0.2}>
        <Investment />
      </FadeIn>

      <FadeIn direction="up" delay={0}>
        <Pricing />
      </FadeIn>

      <FadeIn direction="left" delay={0.1}>
        <Guarantee />
      </FadeIn>

      <FadeIn direction="up" delay={0.1}>
        <FAQ />
      </FadeIn>

      <FadeIn direction="up" delay={0}>
        <FinalCTA />
      </FadeIn>

      <Footer />
    </main>
  );
}
