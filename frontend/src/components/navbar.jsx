// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next'; 

export const Navbar = () => {
  const { t, i18n } = useTranslation(); 
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  // Fonction pour changer la langue
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    // Changer la direction du texte pour l'arabe
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    setLangOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t('navbar.home'), href: "#home" },   
    { name: t('navbar.features'), href: "#features" }, 
    { name: t('navbar.faq'), href: "#faq" },   
  ];

  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "ar", label: "العربية" }
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold tracking-tighter text-white">
          MB PROD<span className="text-accent">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="relative">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors text-sm font-medium focus:outline-none"
            >
              <Globe size={16} />
              {i18n.language.toUpperCase()} 
              <ChevronDown size={14} className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-4 right-0 bg-[#0a0d20] border border-white/10 rounded-xl shadow-xl overflow-hidden py-1 min-w-[120px] z-50"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => changeLanguage(l.code)} 
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors ${
                        i18n.language === l.code ? "text-accent font-medium" : "text-gray-300"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button variant="primary" onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}>
            {t('navbar.join')} 
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-white/10 flex flex-col items-center py-6 gap-6 md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-gray-300 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            
            <div className="flex gap-4 my-2">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => changeLanguage(l.code)}
                  className={`px-3 py-1 rounded-full text-sm border ${
                    i18n.language === l.code ? "border-accent text-accent bg-accent/10" : "border-white/10 text-gray-400 bg-white/5"
                  }`}
                >
                  {l.code.toUpperCase()}
                </button>
              ))}
            </div>

            <Button variant="primary" onClick={() => { setMobileMenuOpen(false); document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' }); }}>
              {t('navbar.join')}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};