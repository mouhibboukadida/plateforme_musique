import { motion } from "framer-motion";
import { Button } from "./Button";

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit text-sm text-accent">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Early Access Invites Open
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              Music Production
            </span> <br />
            Starts Here.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed">
            Join the waitlist to get early access to our next-generation platform built for producers, beatmakers and artists.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button variant="primary" onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}>
              Join Waitlist
            </Button>
            <Button variant="secondary" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Hero Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[500px] w-full flex items-center justify-center perspective-1000"
        >
          <div className="relative w-full max-w-md aspect-square rounded-3xl glass-panel p-8 flex flex-col justify-between overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50"></div>
            
            {/* Abstract UI Elements */}
            <div className="flex justify-between items-center z-10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="h-2 w-20 bg-white/20 rounded-full"></div>
            </div>

            {/* Waveform Animation */}
            <div className="flex items-end justify-center gap-2 h-40 z-10">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 bg-gradient-to-t from-primary to-accent rounded-full"
                  animate={{
                    height: ["20%", "80%", "30%", "100%", "40%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>

            <div className="space-y-3 z-10">
              <div className="h-4 w-3/4 bg-white/10 rounded-full"></div>
              <div className="h-4 w-1/2 bg-white/10 rounded-full"></div>
            </div>
            
            {/* Floating Element */}
            <motion.div
               animate={{ y: [-10, 10, -10] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-accent/40 to-transparent rounded-full blur-xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};