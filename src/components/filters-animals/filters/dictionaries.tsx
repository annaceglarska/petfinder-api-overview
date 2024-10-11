import { SelectOption } from "./filters.types";
import i18next from "./../../../config/i18next";

export const sizeDictionary: SelectOption[] = [
  {
    label: i18next.t("SMALL"),
    value: "small",
  },
  {
    label: i18next.t("MEDIUM"),
    value: "medium",
  },
  {
    label: i18next.t("LARGE"),
    value: "large",
  },
  {
    label: i18next.t("XLARGE"),
    value: "xlarge",
  },
];

export const ageDictionary: SelectOption[] = [
  {
    label: i18next.t("BABY"),
    value: "baby",
  },
  {
    label: i18next.t("YOUNG"),
    value: "young",
  },
  {
    label: i18next.t("ADULT"),
    value: "adult",
  },
];

export const statusDictionary: SelectOption[] = [
  {
    label: i18next.t("ADOPTABLE"),
    value: "adoptable",
  },
  {
    label: i18next.t("ADOPTED"),
    value: "adopted",
  },
];
