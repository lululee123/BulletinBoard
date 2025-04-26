import i18next from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    debug: false,
    lng: localStorage.getItem("uic_language") || "en",
    fallbackLng: "en",
    supportedLngs: ["en", "ja"],
    load: "currentOnly",
    preload: [],
    lowerCaseLng: true,
    ns: [
      "resource", // default,
      "locale", // locale: language, timezone, ...
    ],
    defaultNs: "resource",
    fallbackNs: false,
    interpolation: {
      prefix: "{{",
      suffix: "}}",
      escapeValue: false,
    },
    keySeparator: ".",
    nsSeparator: "::",
    pluralSeparator: "_",
    contextSeparator: "_",
    // options for language detection
    // https://github.com/i18next/i18next-browser-languageDetector
    detection: {
      // order and from where user language should be detected
      order: ["localStorage"],

      // keys or params to lookup language from
      lookupLocalStorage: "uic_language",
    },
    backend: {
      // path where resources get loaded from
      loadPath: () => {
        // eslint-disable-next-line no-undef
        if (process.env.NODE_ENV === "development") {
          // Load resource files from current directory
          return `i18n/{{lng}}/app/{{ns}}.json?v=${new Date().getTime()}`;
        }

        return `../i18n/{{lng}}/app/{{ns}}.json?v=${new Date().getTime()}`;
      },

      // path to post missing resources
      addPath: "api/i18n/sendMissing/{{lng}}/{{ns}}",

      allowMultiLoading: false,

      // allow cross domain requests
      crossDomain: false,
    },
  });

export default i18next;
