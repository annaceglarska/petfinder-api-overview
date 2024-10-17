import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from "./translations/en.json"
import pl from "./translations/pl.json"
import de from "./translations/de.json"
import { initReactI18next } from 'react-i18next';

export const NAMESPACE = 'translation';
export const LANGUAGES = ['de', 'en', 'pl'];

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init<any>({
        supportedLngs: LANGUAGES,
        debug: true,
        ns: [NAMESPACE],
        resources: {
            en,
            pl,
            de
        }
    });


export default i18next;