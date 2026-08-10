// src/components/Features.jsx
import { motion } from "framer-motion";
import { Zap, Users, Sparkles } from "lucide-react";
import { useTranslation } from 'react-i18next'; // ← AJOUTER

export const Features = () => {
  const { t } = useTranslation(); // ← AJOUTER

  // Les données sont maintenant dans les traductions
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: t('features.feature1Title'),        // ← MODIFIÉ
      description: t('features.feature1Desc'),   // ← MODIFIÉ
    },
    {
      icon: <Users className="w-8 h-8 text-secondary" />,
      title: t('features.feature2Title'),        // ← MODIFIÉ
      description: t('features.feature2Desc'),   // ← MODIFIÉ
    },
    {
      icon: <Sparkles className="w-8 h-8 text-accent" />,
      title: t('features.feature3Title'),        // ← MODIFIÉ
      description: t('features.feature3Desc'),   // ← MODIFIÉ
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
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t('features.title')} {/* ← MODIFIÉ */}
          </h2>
          <p className="text-gray-400 text-lg">
            {t('features.subtitle')} {/* ← MODIFIÉ */}
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