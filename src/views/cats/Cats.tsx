import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CardsGrid } from "../../components/cards-grid/CardsGrid";
import {
  Pet,
  PetsQueryParams,
} from "../../services/api/petfinder/pets/pets.types";
import { getPets } from "../../slices/pets/pets.slice";
import { getPetsAsync } from "../../slices/pets/pets.api-actions";
import FiltersAnimals from "../../components/filters-animals/FiltersAnimals";
import styles from "./Cats.module.css";

export const defaultCatFilters: Partial<PetsQueryParams> = { type: "cat" };

const Cats = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPetsAsync(defaultCatFilters));
  }, []);

  const pets: Pet[] = useAppSelector(getPets);
  return (
    <div className={styles["animals-wrapper"]}>
      <FiltersAnimals defaultFilters={defaultCatFilters} />
      <CardsGrid data={pets} />
    </div>
  );
};

export default Cats;
