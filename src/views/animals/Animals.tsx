import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CardsGrid } from "../../components/cards-grid/CardsGrid";
import {
  AnimalType,
  Pet,
  PetsQueryParams,
} from "../../services/api/petfinder/pets/pets.types";
import { clearPets, getPets } from "../../slices/pets/pets.slice";
import { getPetsAsync } from "../../slices/pets/pets.api-actions";
import FiltersAnimals from "../../components/filters-animals/FiltersAnimals";
import styles from "./Animals.module.css";
import { useParams } from "react-router-dom";
import { getAnimalType, isValidAnimalType } from "./Animals.helpers";

export const getDefaultAnimalsFilters = (
  type: AnimalType
): PetsQueryParams => ({ type });

const Animals: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const isValidType = useMemo<boolean>(() => {
    return isValidAnimalType(params.animalType!);
  }, [params]);

  const defaultFilters = useMemo<PetsQueryParams | undefined>(() => {
    const type = getAnimalType(params.animalType!);
    return type ? getDefaultAnimalsFilters(type) : {};
  }, [params]);

  useEffect(() => {
    if (isValidType) {
      dispatch(getPetsAsync(defaultFilters!));
    }
    return () => {
      dispatch(clearPets());
    };
  }, [isValidType, defaultFilters]);

  const pets: Pet[] = useAppSelector(getPets);

  if (!isValidType) {
    return <>Wrong animal type</>;
  }

  return (
    <div className={styles["animals-wrapper"]}>
      <FiltersAnimals defaultFilters={defaultFilters!} />
      <CardsGrid data={pets} />
    </div>
  );
};

export default Animals;
