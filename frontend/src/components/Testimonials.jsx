import { motion } from "framer-motion";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Electronic Producer",
      quote: "I've tried every DAW out there. This platform feels like it was built in the future. The collaborative features alone are a game changer.",
      initials: "AR"
    },
    {
      name: "Sarah Jenkins",
      role: "Beatmaker & Sound Designer",
      quote: "The AI suggestions aren't just gimmicks; they actually understand the context of my mix. It's sped up my workflow tenfold.",
      initials: "SJ"
    },
    {
      name: "Marcus Chen",
      role: "Mixing Engineer",
      quote: "Finally, a cloud-based solution that doesn't compromise on audio quality or latency. I can work on client projects from anywhere.",
      initials: "MC"
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">What Producers Are Saying</h2>
          <p className="text-gray-400 text-lg">Early beta testers are already shaping the future of sound.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-8 rounded-3xl relative"
            >
              <div className="text-4xl text-primary/40 absolute top-6 left-6 font-serif">"</div>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 mt-6 relative z-10">
                {t.quote}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
