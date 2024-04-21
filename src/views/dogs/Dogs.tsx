import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CardsGrid } from "../../components/cards-grid/CardsGrid";
import { Pet, PetsQueryParams } from "../../services/api/pets/pets.types";
import { getPets } from "../../slices/pets/pets.slice";
import { getPetsAsync } from "../../slices/pets/pets.api-actions";
import FiltersAnimals from "../../components/filters-animals/FiltersAnimals";
import styles from "./Dogs.module.css";

export const defaultDogFilters: Partial<PetsQueryParams> = { type: "dog" };

const Dogs = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPetsAsync(defaultDogFilters));
  }, []);

  const pets: Pet[] = useAppSelector(getPets);
  return (
    <div className={styles["animals-wrapper"]}>
      <FiltersAnimals />
      <CardsGrid data={pets} />
    </div>
  );
};

export default Dogs;
