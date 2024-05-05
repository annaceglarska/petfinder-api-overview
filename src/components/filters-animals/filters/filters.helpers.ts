import { SelectOption } from "./filters.types";

export const createDictionary = (characteristics: string[]): SelectOption[] => {
  return characteristics.map((element) => {
    return {
      label: element,
      value: element.toLowerCase(),
    };
  });
};
