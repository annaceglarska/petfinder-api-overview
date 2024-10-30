import {
  Autocomplete,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import {
  sizeDictionary,
  ageDictionary,
  statusDictionary,
} from "./filters/dictionaries";
import React, { ChangeEventHandler, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setPetsQueryParams } from "../../slices/pets/pets.slice";
import { FilterDictionaries, SelectOption } from "./filters/filters.types";
import { createDictionary } from "./filters/filters.helpers";
import { getOrganizationsAsync } from "../../slices/organizations/organizations.api-actions";
import {
  clearOrganizations,
  getOrganizations,
} from "../../slices/organizations/organizations.slice";
import { Organization } from "../../services/api/petfinder/organizations/organizations.type";
import {
  AnimalType,
  AnimalTypesDetails,
  PetsQueryParams,
} from "../../services/api/petfinder/pets/pets.types";
import styles from "../filters-animals/FiltersAnimals.module.css";
import { useTranslation } from "react-i18next";
import { useGetPetTypesQuery } from "../../slices/pets/pets.api";
import { sendResetInfiniteScrollEvent } from "../../utils/Utils";

export interface FormData {
  type: AnimalType | undefined;
  gender: string | undefined;
  size: string | undefined;
  age: string | undefined;
  coat: string | undefined;
  status: string | undefined;
  color: string | undefined;
  good_with_children: boolean | undefined;
  good_with_dogs: boolean | undefined;
  good_with_cats: boolean | undefined;
  house_trained: boolean | undefined;
  declawed: boolean | undefined;
  special_needs: boolean | undefined;
  organization: string | undefined;
}

export interface FiltersAnimalsProps {
  defaultFilters: PetsQueryParams;
  fetchPets: () => void;
}

const FiltersAnimals: React.FC<FiltersAnimalsProps> = (props) => {
  const dispatch = useAppDispatch();
  const { data: typesOfPets } = useGetPetTypesQuery();

  const organizationsByPhrase: Organization[] =
    useAppSelector(getOrganizations);

  const { t } = useTranslation();
  const organizationOptions: SelectOption[] = useMemo<SelectOption[]>(() => {
    if (!organizationsByPhrase) {
      return [];
    }
    return organizationsByPhrase.map((organization) => ({
      label: organization.name,
      value: organization.id,
    }));
  }, [organizationsByPhrase]);

  useEffect(() => {
    setFilterData({ ...filterData, ...props.defaultFilters });
  }, [props.defaultFilters]);

  const [filterData, setFilterData] = useState<FormData>({
    type: undefined,
    gender: undefined,
    size: undefined,
    age: undefined,
    coat: undefined,
    status: undefined,
    color: undefined,
    good_with_children: undefined,
    good_with_dogs: undefined,
    good_with_cats: undefined,
    house_trained: undefined,
    declawed: undefined,
    special_needs: undefined,
    organization: undefined,
  });

  useEffect(() => {
    return () => {
      dispatch(clearOrganizations());
    };
  }, []);

  const typeDictionary = useMemo<SelectOption[]>(() => {
    if (!typesOfPets) {
      return [];
    }
    const types = typesOfPets.types.map(({ name }) => name);
    return createDictionary(types);
  }, [typesOfPets]);

  const petTypeDetails = useMemo<AnimalTypesDetails | undefined>(() => {
    if (!filterData.type || !typesOfPets) {
      return undefined;
    }
    return typesOfPets.types.find(
      ({ name }) => name.toLowerCase() === filterData.type
    );
  }, [typesOfPets, filterData.type]);

  const { genderDictionary, coatsDictionary, colorsDictionary } =
    useMemo<FilterDictionaries>(() => {
      if (!petTypeDetails) {
        return {
          genderDictionary: [],
          coatsDictionary: [],
          colorsDictionary: [],
        };
      }
      return {
        genderDictionary: createDictionary(petTypeDetails.genders),
        coatsDictionary: createDictionary(petTypeDetails.coats),
        colorsDictionary: createDictionary(petTypeDetails.colors),
      };
    }, [petTypeDetails]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value, name },
    } = event;
    setFilterData({
      ...filterData,
      [name]: value,
    });
  };

  const handleTextFieldChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const {
      target: { value, name },
    } = event;
    setFilterData({
      ...filterData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const {
      target: { name },
    } = event;
    setFilterData({
      ...filterData,
      [name]: checked || undefined,
    });
  };

  const handleAutocompleteChange =
    (name: string) =>
    (
      event: React.SyntheticEvent<Element, Event>,
      value: SelectOption | null,
      reason: AutocompleteChangeReason
    ) => {
      console.log("handleAutocompleteChange", event, reason, value);
      if (reason === "selectOption") {
        setFilterData({
          ...filterData,
          [name]: value?.value,
        });
      }
    };

  const handleAutocompleteInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => {
    if (reason === "input") {
      dispatch(getOrganizationsAsync({ query: value }));
    }
  };

  const handleAutocompleteOpen = () => {
    if (!filterData.organization) {
      dispatch(getOrganizationsAsync({}));
    }
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    sendResetInfiniteScrollEvent();

    dispatch(setPetsQueryParams(filterData));
    props.fetchPets();
  };

  return (
    <form onSubmit={submitHandler}>
      {!props.defaultFilters.type && (
        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="type-field">{t("TYPE")}</InputLabel>
            <Select
              labelId="type-field"
              name="type"
              value={filterData.type || ""}
              onChange={handleChange}
              input={
                <OutlinedInput id="select-multiple-chip" label={t("TYPE")} />
              }
            >
              {typeDictionary.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
      {(petTypeDetails || props.defaultFilters.type) && (
        <>
          <div>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="gender-field">{t("GENDER")}</InputLabel>
              <Select
                labelId="gender-field"
                name="gender"
                value={filterData.gender || ""}
                onChange={handleChange}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label={t("GENDER")}
                  />
                }
              >
                {genderDictionary.map((gender) => (
                  <MenuItem key={gender.value} value={gender.value}>
                    {gender.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="size-field">{t("SIZE")}</InputLabel>
              <Select
                labelId="size-field"
                name="size"
                value={filterData.size || ""}
                onChange={handleChange}
                input={
                  <OutlinedInput id="select-multiple-chip" label={t("SIZE")} />
                }
              >
                {sizeDictionary.map((size) => (
                  <MenuItem key={size.value} value={size.value}>
                    {size.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="age-field">{t("AGE")}</InputLabel>
              <Select
                labelId="age-field"
                name="age"
                value={filterData.age || ""}
                onChange={handleChange}
                input={
                  <OutlinedInput id="select-multiple-chip" label={t("AGE")} />
                }
              >
                {ageDictionary.map((age) => (
                  <MenuItem key={age.value} value={age.value}>
                    {age.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="coat-field">{t("COAT")}</InputLabel>
              <Select
                labelId="coat-field"
                name="coat"
                value={filterData.coat || ""}
                onChange={handleChange}
                input={
                  <OutlinedInput id="select-multiple-chip" label={t("COAT")} />
                }
              >
                {coatsDictionary.map((coat) => (
                  <MenuItem key={coat.value} value={coat.value}>
                    {coat.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="status-field">{t("STATUS")}</InputLabel>
              <Select
                labelId="status-field"
                name="status"
                value={filterData.status || ""}
                onChange={handleChange}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label={t("STATUS")}
                  />
                }
              >
                {statusDictionary.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="status-field">{t("COLOR")}</InputLabel>
              <Select
                labelId="color-field"
                name="color"
                value={filterData.color || ""}
                onChange={handleChange}
                input={
                  <OutlinedInput id="select-multiple-chip" label={t("COLOR")} />
                }
              >
                {colorsDictionary.map((color) => (
                  <MenuItem key={color.value} value={color.value}>
                    {color.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </>
      )}

      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <FormControlLabel
            control={
              <Checkbox
                name="good_with_children"
                checked={filterData.good_with_children || false}
                onChange={handleCheckboxChange}
                inputProps={{ "aria-label": t("GOOD_WITH_CHILDREN") }}
              />
            }
            label={t("GOOD_WITH_CHILDREN")}
          />
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <FormControlLabel
            control={
              <Checkbox
                name="good_with_dogs"
                checked={filterData.good_with_dogs || false}
                onChange={handleCheckboxChange}
                inputProps={{ "aria-label": t("GOOD_WITH_DOGS") }}
              />
            }
            label={t("GOOD_WITH_DOGS")}
          />
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <FormControlLabel
            control={
              <Checkbox
                name="good_with_cats"
                checked={filterData.good_with_cats || false}
                onChange={handleCheckboxChange}
                inputProps={{ "aria-label": t("GOOD_WITH_CATS") }}
              />
            }
            label={t("GOOD_WITH_CATS")}
          />
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <FormControlLabel
            control={
              <Checkbox
                name="house_trained"
                checked={filterData.house_trained || false}
                onChange={handleCheckboxChange}
                inputProps={{ "aria-label": t("HOUSE_TRAINED") }}
              />
            }
            label={t("HOUSE_TRAINED")}
          />
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <FormControlLabel
            control={
              <Checkbox
                name="declawed"
                checked={filterData.declawed || false}
                onChange={handleCheckboxChange}
                inputProps={{ "aria-label": t("DECLAWED") }}
              />
            }
            label={t("DECLAWED")}
          />
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <FormControlLabel
            control={
              <Checkbox
                name="special_needs"
                checked={filterData.special_needs || false}
                onChange={handleCheckboxChange}
                inputProps={{ "aria-label": t("SPECIAL_NEEDS") }}
              />
            }
            label={t("SPECIAL_NEEDS")}
          />
        </FormControl>
      </div>
      {!props.defaultFilters.organization && (
        <div>
          <Autocomplete
            disablePortal
            id="organizations"
            onInputChange={handleAutocompleteInputChange}
            onChange={handleAutocompleteChange("organization")}
            onOpen={handleAutocompleteOpen}
            options={organizationOptions}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="organization"
                label={t("ORGANIZATION")}
              />
            )}
          />
        </div>
      )}

      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <TextField
            label={t("LOCALIZATION")}
            onChange={handleTextFieldChange}
            name="localization"
          />
        </FormControl>
      </div>

      {/* <label>Location</label>
      <label>Distance</label>  */}
      <Button
        variant="contained"
        size="medium"
        type="submit"
        className={styles["form__button--submit"]}
      >
        {t("FIND")}
      </Button>
    </form>
  );
};

export default FiltersAnimals;
