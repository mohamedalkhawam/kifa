// import I18n from "i18n-js";
// import * as RNLocalize from "expo-localization";
// // import * as RNLocalize from "react-native-localize";
import en from "./en";
import ar from "./ar";
// import { I18nManager } from "react-native";

// const locales = RNLocalize.locales;
// if (Array.isArray(locales)) {
//   I18nManager.allowRTL(true);

//   if (I18nManager.isRTL) {
//     I18nManager.forceRTL(true);
//     I18n.locale = "ar";
//   } else {
//     I18n.locale = "en";
//   }
// } else {
//   I18nManager.forceRTL(false);
//   I18n.locale = "en";
// }
// I18n.fallbacks = true;
// I18n.translations = {
//   en,
//   ar,
// };

// export default I18n;
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n

  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",

    debug: true,
    resources: {
      en: {
        translations: en,
      },
      ar: {
        translations: ar,
      },
    },
    defaultNS: "translations",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    preload: ["en", "ar"],
    lng: ["en", "ar"],
    lngWhitelist: ["en", "ar"],
    ns: "translations",
    supportedLngs: ["en", "ar"],
    load: "all",
    cleanCode: true,
    saveMissingTo: "all",
  });
i18n.cha;
export default i18n;
