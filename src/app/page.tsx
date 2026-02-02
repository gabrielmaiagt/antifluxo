import UrgencyBanner from "@/components/ui/urgency-banner";
import InfiniteHero from "@/components/ui/infinite-hero";
import Benefits from "@/components/ui/benefits";
import LevelerCard from "@/components/ui/leveler-card";
import Testimonials from "@/components/ui/testimonials";
import LearningCTA from "@/components/ui/learning-cta";
import Modules from "@/components/ui/modules";
import Investment from "@/components/ui/investment";
import Pricing from "@/components/ui/pricing";
import Guarantee from "@/components/ui/guarantee";
import FAQ from "@/components/ui/faq";
import FinalCTA from "@/components/ui/final-cta";
import Footer from "@/components/ui/footer";
import FadeIn from "@/components/ui/fade-in";

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
