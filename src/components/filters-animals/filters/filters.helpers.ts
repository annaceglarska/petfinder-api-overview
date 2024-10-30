import { SelectOption } from "./filters.types";
import i18next, { NAMESPACE } from "./../../../config/i18next";

export const createDictionary = (characteristics: string[]): SelectOption[] => {
  const missingTranslation: string[] = []

  const dictionary = characteristics.map((element) => {

    const translationDictionary = i18next.getDataByLanguage('en') || {}
    const values = translationDictionary[NAMESPACE]

    const translation = Object.entries(values || {}).find(([_, value]) => element === value)

    const translationKey: string | undefined = translation?.[0]

    if (!translationKey) {
      missingTranslation.push(element)
    }

    return {
      label: translationKey ? i18next.t(translationKey) : element,
      value: element.toLowerCase(),
    };
  });

  if (missingTranslation.length)
    console.info(`Missing translations for phrases`, missingTranslation)

  return dictionary;
};
