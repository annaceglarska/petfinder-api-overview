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
  getPetTypesAsync,
  getPetsAsync,
} from "../../slices/pets/pets.api-actions";
import {
  clearTypes,
  getPetTypeInfoByTypeName,
} from "../../slices/pets/pets.slice";
import { FilterDictionaries, SelectOption } from "./filters/filters.types";
import { createDictionary } from "./filters/filters.helpers";
import { getOrganizationsAsync } from "../../slices/organization/organization.api-actions";
import {
  clearOrganizations,
  getOrganizations,
} from "../../slices/organization/organization.slice";
import { Organization } from "../../services/api/petfinder/organization/organization.type";
import { PetsQueryParams } from "../../services/api/petfinder/pets/pets.types";
import styles from "../filters-animals/FiltersAnimals.module.css";

export interface FormData {
  gender: string | undefined;
  size: string | undefined;
  age: string | undefined;
  coat: string | undefined;
  status: string | undefined;
  color: string | undefined;
  good_with_children: true | undefined;
  good_with_dogs: true | undefined;
  good_with_cats: true | undefined;
  house_trained: true | undefined;
  declawed: true | undefined;
  special_needs: true | undefined;
  organization: string | undefined;
}

export interface FiltersAnimalsProps {
  defaultFilters: PetsQueryParams;
}

const FiltersAnimals: React.FC<FiltersAnimalsProps> = (props) => {
  const dispatch = useAppDispatch();
  const organizationsByPhrase: Organization[] =
    useAppSelector(getOrganizations);
  const organizationOptions: SelectOption[] = useMemo<SelectOption[]>(() => {
    if (!organizationsByPhrase) {
      return [];
    }
    return organizationsByPhrase.map((organization) => ({
      label: organization.name,
      value: organization.id,
    }));
  }, [organizationsByPhrase]);

  const [filterData, setFilterData] = useState<FormData>({
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
    dispatch(getPetTypesAsync(null));
    return () => {
      dispatch(clearOrganizations());
      dispatch(clearTypes());
    };
  }, []);

  const petTypes = useAppSelector(
    getPetTypeInfoByTypeName(props.defaultFilters.type!)
  );

  const { genderDictionary, coatsDictionary, colorsDictionary } =
    useMemo<FilterDictionaries>(() => {
      if (!petTypes) {
        return {
          genderDictionary: [],
          coatsDictionary: [],
          colorsDictionary: [],
        };
      }
      return {
        genderDictionary: createDictionary(petTypes.genders),
        coatsDictionary: createDictionary(petTypes.coats),
        colorsDictionary: createDictionary(petTypes.colors),
      };
    }, [petTypes]);

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
    console.log("handleAutocompleteInputChange", event, value, reason);
    if (reason === "input") {
      dispatch(getOrganizationsAsync({ query: value }));
    }
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(
      getPetsAsync({
        ...props.defaultFilters,
        ...filterData,
      })
    );
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="gender-field">Gender</InputLabel>
          <Select
            labelId="gender-field"
            name="gender"
            value={filterData.gender || ""}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Gender" />}
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
          <InputLabel id="size-field">Size</InputLabel>
          <Select
            labelId="size-field"
            name="size"
            value={filterData.size || ""}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Size" />}
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
          <InputLabel id="age-field">Age</InputLabel>
          <Select
            labelId="age-field"
            name="age"
            value={filterData.age || ""}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Age" />}
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
          <InputLabel id="coat-field">Coat</InputLabel>
          <Select
            labelId="coat-field"
            name="coat"
            value={filterData.coat || ""}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Coat" />}
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
          <InputLabel id="status-field">Status</InputLabel>
          <Select
            labelId="status-field"
            name="status"
            value={filterData.status || ""}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Status" />}
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
          <InputLabel id="status-field">Color</InputLabel>
          <Select
            labelId="color-field"
            name="color"
            value={filterData.color || ""}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Color" />}
          >
            {colorsDictionary.map((color) => (
              <MenuItem key={color.value} value={color.value}>
                {color.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <FormControlLabel
            control={
              <Checkbox
                name="good_with_children"
                checked={filterData.good_with_children || false}
                onChange={handleCheckboxChange}
                inputProps={{ "aria-label": "Good with children" }}
              />
            }
            label="Good with children"
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
                inputProps={{ "aria-label": "Good with dogs" }}
              />
            }
            label="Good with dogs"
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
                inputProps={{ "aria-label": "Good with cats" }}
              />
            }
            label="Good with cats"
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
                inputProps={{ "aria-label": "House trained" }}
              />
            }
            label="House trained"
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
                inputProps={{ "aria-label": "Declawed" }}
              />
            }
            label="Declawed"
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
                inputProps={{ "aria-label": "Special needs" }}
              />
            }
            label="Special needs"
          />
        </FormControl>
      </div>
      <div>
        <Autocomplete
          disablePortal
          id="organizations"
          onInputChange={handleAutocompleteInputChange}
          onChange={handleAutocompleteChange("organization")}
          options={organizationOptions}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} name="organization" label="Organization" />
          )}
        />
      </div>
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <TextField
            label="localization"
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
        Find
      </Button>
    </form>
  );
};

export default FiltersAnimals;
