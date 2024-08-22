import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import translationEn from "./assets/lang/en.json"
import translationKo from "./assets/lang/ko.json"
import LanguageDetector from "i18next-browser-languagedetector"

const resources = {
	en: {
		translation: translationEn,
	},
	ko: {
		translation: translationKo,
	},
}

const lngDetector = new LanguageDetector(null, {
	order: [
		"querystring",
		"cookie",
		"localStorage",
		"sessionStorage",
		"navigator",
		"htmlTag",
		"path",
		"subdomain",
	],
})

i18n.use(lngDetector)
	.use(initReactI18next)
	.init({
		resources: resources,
		fallbackLng: "en",
		keySeparator: ".",
		interpolation: {
			escapeValue: false,
		},
	})

export default i18n
