// src/i18n/index.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importer les traductions
import en from './locales/en/translation.json';
import fr from './locales/fr/translation.json';
import ar from './locales/ar/translation.json';

// Ressources de traduction
const resources = {
  en: { translation: en },
  fr: { translation: fr },
  ar: { translation: ar }
};

i18n
  // Détecter la langue du navigateur
  .use(LanguageDetector)
  // Connecter avec React
  .use(initReactI18next)
  // Initialiser
  .init({
    resources,
    lng: 'en', // Langue par défaut
    fallbackLng: 'en', // Langue de secours
    interpolation: {
      escapeValue: false // React gère déjà la sécurité
    }
  });

export default i18n;