import {Navbar} from "../components/Navbar";
import {Footer} from "../components/Footer";
import {Hero} from "../components/Hero";
import {Features} from "../components/Features";
import {Testimonials} from "../components/Testimonials";
import {Waitlist} from "../components/Waitlist";
import {stats} from "../components/Stats";
import {FAQ} from "../components/FAQ";
import { motion, useScroll, useSpring } from "framer-motion";

export const home=()=>{
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
}



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
        <Features />
        <Testimonials />
        <FAQ />
        <Waitlist />
        <Stats />
    </main>
    <Footer />
    </div>
)