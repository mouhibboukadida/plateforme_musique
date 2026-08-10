import i18n from 'i18next';
import {initReactI18next, Translation} from "react-i18next";
import LanguageDetector from 'i18next-browser-languageDetector';

import en from './locales/en/translation.json';
import fr from './locales/fr/translation.json';
import ar from './locales/ar/translation.json';

const resources={
    en: {Translation: en},
    fr: {Translation: fr},
    ar: {Translation: ar}
};
i18n.use(LanguageDetector)

i18n.use(initReactI18next)

i18n.init({
    resources,
    lng: 'en',
    interpolation:{
        escapeValue: false
    }
});

export default i18n;