import { SelectOptions } from "./filters.types";

export const createDictionary = (
  characteristics: string[]
): SelectOptions[] => {
  return characteristics.map((element) => {
    return {
      label: element,
      value: element.toLowerCase(),
    };
  });
};
