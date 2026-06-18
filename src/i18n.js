import i18n from "i18next";
import en from "./locales/en";
import th from "./locales/th";

const savedLanguage =
  typeof window !== "undefined" ? window.localStorage.getItem("cv-language") : null;

i18n.init({
  resources: {
    en: { translation: en },
    th: { translation: th },
  },
  lng: savedLanguage || "th",
  fallbackLng: "th",
  interpolation: {
    escapeValue: false,
  },
});

if (typeof document !== "undefined") {
  document.documentElement.lang = i18n.language;
}

i18n.on("languageChanged", (language) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("cv-language", language);
  }

  if (typeof document !== "undefined") {
    document.documentElement.lang = language;
  }
});

export default i18n;
