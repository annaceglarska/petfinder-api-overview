import { SelectOption } from "./filters.types";
import i18next, { NAMESPACE } from "./../../../config/i18next";

export const createDictionary = (characteristics: string[]): SelectOption[] => {
  return characteristics.map((element) => {

    const translationDictionary = i18next.getDataByLanguage('en') || {}
    const values = translationDictionary[NAMESPACE]

    const translation = Object.entries(values || {}).find(([_, value]) => element === value)

    const translationKey: string | undefined = translation?.[0]

    if (!translationKey) {
      console.info(`Missing translation for phrase ${element}`)
    }

    return {
      label: translationKey ? i18next.t(translationKey) : element,
      value: element.toLowerCase(),
    };
  });
};
