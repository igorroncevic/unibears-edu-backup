import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: "en",
		// This will be loaded server-side so Next.js won't have access to window.localStorage and it will throw an error.
		lng: typeof window !== "undefined" ? (localStorage.getItem("i18nextLng") || "en") : "en",
		resources: {
			en: {
				common: require("./en/common.json"),
				courses: require("./en/courses.json"),
				toasts: require("./en/toasts.json"),
			},
			sr: {
				common: require("./sr/common.json"),
				courses: require("./sr/courses.json"),
				toasts: require("./sr/toasts.json"),
			},
		},
		ns: ["common", "courses", "toasts"],
		defaultNS: "common",
	});

i18n.languages = ["en", "sr"];

export default i18n;
