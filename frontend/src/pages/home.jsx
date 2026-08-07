import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Stats } from "../components/Stats";
import { Waitlist } from "../components/Waitlist";
import { Testimonials } from "../components/Testimonials";
import { FAQ } from "../components/FAQ";
import { Footer } from "../components/Footer";
import { motion, useScroll, useSpring } from "framer-motion";

export const Home = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    });

  return (
    <div className="bg-background text-white min-h-screen selection:bg-primary/30">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary origin-left z-[100]"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main>
        <Hero />
        <Stats />
        <Features />
        <Waitlist />
        <Testimonials />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};