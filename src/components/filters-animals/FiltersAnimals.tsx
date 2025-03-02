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
import {
  getPetsFilters,
  setPetsQueryParams,
} from "../../slices/pets/pets.slice";
import { FilterDictionaries, SelectOption } from "./filters/filters.types";
import { createDictionary } from "./filters/filters.helpers";
import {
  AnimalType,
  AnimalTypesDetails,
  PetsQueryParams,
} from "../../services/api/petfinder/pets/pets.types";
import styles from "../filters-animals/FiltersAnimals.module.css";
import { useTranslation } from "react-i18next";
import { useGetPetTypesQuery } from "../../slices/pets/pets.api";
import { sendResetInfiniteScrollEvent } from "../../utils/Utils";
import { useGetOrganizationsQuery } from "../../slices/organizations/organization.api";
import { OrganizationQueryParam } from "../../services/api/petfinder/organizations/organizations.type";
import { SubmitHandler, useForm } from "react-hook-form";
import { AnimalFilterFormData } from "./FiltersAnimals.types";
import { useLocation, useParams } from "react-router-dom";

export interface FiltersAnimalsProps {
  fetchPets: () => void;
}

const FiltersAnimals: React.FC<FiltersAnimalsProps> = (props) => {
  const { register, handleSubmit, watch, setValue, getValues, trigger } =
    useForm<AnimalFilterFormData>({
      defaultValues: {},
    });

  const params = useParams();
  const isOnPetsPath = !!params.animalType;

  const dispatch = useAppDispatch();

  const storeFilters = useAppSelector(getPetsFilters);

  useEffect(() => {
    //! ToDo - fix dynamic change of field value in select Gender + check others
    const formFilters = getValues();

    Object.entries(storeFilters).forEach(([key, value]) => {
      if (value !== formFilters[key as keyof AnimalFilterFormData]) {
        setValue(key as keyof AnimalFilterFormData, value);
        trigger(key as keyof AnimalFilterFormData);
      }
    });
  }, [storeFilters, setValue, getValues, trigger]);

  const type = watch("type");
  const organization = watch("organization");

  const [organizationFilters, setOrganizationFilters] =
    useState<OrganizationQueryParam>({});

  const { data: typesOfPets } = useGetPetTypesQuery();
  const { data: organizationsByPhrase, refetch: refetchOrganizationsByPhrase } =
    useGetOrganizationsQuery(organizationFilters);

  const { t } = useTranslation();
  const organizationOptions: SelectOption[] = useMemo<SelectOption[]>(() => {
    if (!organizationsByPhrase?.organizations) {
      return [];
    }
    return organizationsByPhrase.organizations.map((organization) => ({
      label: organization.name,
      value: organization.id,
    }));
  }, [organizationsByPhrase]);

  const typeDictionary = useMemo<SelectOption[]>(() => {
    if (!typesOfPets) {
      return [];
    }
    const types = typesOfPets.types.map(({ name }) => name);
    return createDictionary(types);
  }, [typesOfPets]);

  const petTypeDetails = useMemo<AnimalTypesDetails | undefined>(() => {
    if (!type || !typesOfPets) {
      return undefined;
    }
    return typesOfPets.types.find(({ name }) => name.toLowerCase() === type);
  }, [typesOfPets, type]);

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

  // const handleTextFieldChange: ChangeEventHandler<
  //   HTMLInputElement | HTMLTextAreaElement
  // > = (event) => {
  //   const {
  //     target: { value, name },
  //   } = event;
  //   setFilterData({
  //     ...filterData,
  //     [name]: value,
  //   });
  // };

  const handleAutocompleteInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => {
    if (reason === "input") {
      setOrganizationFilters({ query: value });
    }
  };

  const handleAutocompleteOpen = () => {
    if (!organization) {
      refetchOrganizationsByPhrase();
    }
  };

  const onSubmit: SubmitHandler<AnimalFilterFormData> = (formData) => {
    sendResetInfiniteScrollEvent();
    const data = Object.entries(formData).reduce<AnimalFilterFormData>(
      (collector, [key, value]) => {
        if (!value === false) {
          collector[key as keyof AnimalFilterFormData] = value;
        }
        return collector;
      },
      {} as AnimalFilterFormData
    );
    dispatch(setPetsQueryParams(data));
    props.fetchPets();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!isOnPetsPath && (
        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="type-field">{t("TYPE")}</InputLabel>
            <Select
              {...register("type")}
              labelId="type-field"
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
      {(petTypeDetails || isOnPetsPath) && (
        <>
          <div>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="gender-field">{t("GENDER")}</InputLabel>
              <Select
                {...register("gender")}
                labelId="gender-field"
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
                {...register("size")}
                labelId="size-field"
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
                {...register("age")}
                labelId="age-field"
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
                {...register("coat")}
                labelId="coat-field"
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
                {...register("status")}
                labelId="status-field"
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
                {...register("color")}
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
                {...register("good_with_children")}
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
                {...register("good_with_dogs")}
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
                {...register("good_with_cats")}
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
                {...register("house_trained")}
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
                {...register("declawed")}
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
                {...register("special_needs")}
                inputProps={{ "aria-label": t("SPECIAL_NEEDS") }}
              />
            }
            label={t("SPECIAL_NEEDS")}
          />
        </FormControl>
      </div>
      {!organization && (
        <div>
          <Autocomplete
            {...register("organization")}
            disablePortal
            id="organizations"
            onInputChange={handleAutocompleteInputChange}
            onOpen={handleAutocompleteOpen}
            options={organizationOptions}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label={t("ORGANIZATION")} />
            )}
          />
        </div>
      )}

      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <TextField
            {...register("localization")}
            label={t("LOCALIZATION")}
            // onChange={handleTextFieldChange}
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
