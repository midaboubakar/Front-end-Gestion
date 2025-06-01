import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import des fichiers de traduction (tu peux aussi utiliser un backend pour charger à la volée)
import translationFR from "./locales/fr/translation.json";
import translationEN from "./locales/en/translation.json";

const resources = {
  fr: {
    translation: translationFR,
  },
  en: {
    translation: translationEN,
  },
};

i18n
  .use(initReactI18next) // Passer à react-i18next
  .init({
    resources,
    lng: "fr", // Langue par défaut
    fallbackLng: "en", // Langue de secours si traduction manquante
    interpolation: {
      escapeValue: false, // React s'occupe de la sécurité
    },
  });

export default i18n;
