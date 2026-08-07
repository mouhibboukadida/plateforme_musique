import { motion } from "framer-motion";
import { Zap, Users, Sparkles } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Lightning Fast Workflow",
      description: "Experience zero latency and an optimized interface designed to keep you in the creative zone without interruptions.",
    },
    {
      icon: <Users className="w-8 h-8 text-secondary" />,
      title: "Collaboration",
      description: "Connect with producers worldwide. Share projects, stems, and ideas in real-time within a unified workspace.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-accent" />,
      title: "AI Powered Tools",
      description: "Harness the power of intelligent assistants for mastering, mixing suggestions, and creative block breakthroughs.",
    }
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Designed for Modern Creators</h2>
          <p className="text-gray-400 text-lg">
            Everything you need to produce, mix, and master your next hit, all in one seamless environment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="glass-panel p-8 rounded-3xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(108,99,255,0.15)] group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
