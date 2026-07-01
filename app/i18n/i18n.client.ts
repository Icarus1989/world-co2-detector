"use client";

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { resources } from "./resources";

if (!i18n.isInitialized) {
	i18n
		.use(LanguageDetector)
		.use(initReactI18next)
		.init({
			resources: resources,
			supportedLngs: ["it", "en", "nl", "de"],
			fallbackLng: "it",
			// <--- aggiungere anche qui per supporto altre lingue
			interpolation: {
				escapeValue: false
			}
		});
}

export default i18n;
