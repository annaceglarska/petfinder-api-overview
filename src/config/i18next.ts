import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from "./translations/en.json"
import pl from "./translations/pl.json"
import de from "./translations/de.json"
import { initReactI18next } from 'react-i18next';

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init<any>({
        supportedLngs: ['de', 'en', 'pl'],
        debug: true,
        ns: ['translation'],
        resources: {
            en,
            pl,
            de
        }
    });

export default i18next;