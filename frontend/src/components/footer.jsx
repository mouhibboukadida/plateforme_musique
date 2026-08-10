// src/components/Footer.jsx
import { Globe, Mail, Share2 } from "lucide-react";
import { useTranslation } from 'react-i18next'; 

export const Footer = () => {
  const { t } = useTranslation(); 

  return (
    <footer className="glass-panel border-t border-white/5 py-12 mt-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <a href="#home" className="text-3xl font-bold tracking-tighter text-white mb-4 block">
              MB PROD<span className="text-accent">.</span>
            </a>
            <p className="text-gray-400 max-w-sm">
              {t('footer.description')} 
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">{t('footer.navigation')}</h4> 
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">{t('navbar.home')}</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">{t('navbar.features')}</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">{t('navbar.faq')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">{t('footer.connect')}</h4> 
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all" aria-label="Globe">
                <Globe size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all" aria-label="Mail">
                <Mail size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all" aria-label="Share">
                <Share2 size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} {t('footer.rights')}</p> 
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a> 
            <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a> 
          </div>
        </div>
      </div>
    </footer>
  );
};