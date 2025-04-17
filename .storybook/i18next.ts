import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const ns = ["common"];
const supportedLngs = ["en", "fr", "es", "de"];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    //debug: true,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    defaultNS: "common",
    ns,
    supportedLngs,
  });

supportedLngs.forEach((lang) => {
  ns.forEach((n) => {
    i18n.addResourceBundle(
      lang,
      n,
      require(`../packages/ui/languages/i18n/${lang}.json`)
    );
  });
});

export { i18n };

// import translationEN from "../packages/ui/languages/i18n/en.json";
// import translationFR from "../packages/ui/languages/i18n/fr.json";
// import translationDE from "../packages/ui/languages/i18n/de.json";
// import translationES from "../packages/ui/languages/i18n/es.json";