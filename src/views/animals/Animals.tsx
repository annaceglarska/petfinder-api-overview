import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  AnimalType,
  Pet,
  PetsQueryParams,
} from "../../services/api/petfinder/pets/pets.types";
import {
  clearPets,
  clearPetsFilters,
  getPets,
  getPetsFilters,
  getPetsPaginationInfo,
  isPetsDataPending,
  setPetsQueryParams,
} from "../../slices/pets/pets.slice";
import { getPetsAsync } from "../../slices/pets/pets.api-actions";
import FiltersAnimals from "../../components/filters-animals/FiltersAnimals";
import styles from "./Animals.module.css";
import { useParams } from "react-router-dom";
import { getAnimalType, isValidAnimalType } from "./Animals.helpers";
import { InfiniteScroll } from "../../components/infinite-scroll/InfiniteScroll";
import { CardsGrid } from "../../components/cards-grid/CardsGrid";

export const getDefaultAnimalsFilters = (
  type: AnimalType
): PetsQueryParams => ({ type });

const Animals: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const loading: boolean = useAppSelector(isPetsDataPending);
  const pagination = useAppSelector(getPetsPaginationInfo);
  const petsFilters = useAppSelector(getPetsFilters);

  const isValidType = useMemo<boolean>(() => {
    return isValidAnimalType(params.animalType!);
  }, [params]);

  const defaultFilters = useMemo<PetsQueryParams | undefined>(() => {
    const type = getAnimalType(params.animalType!);
    return type ? getDefaultAnimalsFilters(type) : {};
  }, [params]);

  useEffect(() => {
    if (isValidType) {
      dispatch(setPetsQueryParams(defaultFilters!));
      dispatch(getPetsAsync());
    }
    return () => {
      dispatch(clearPets());
      dispatch(clearPetsFilters());
    };
  }, [isValidType, defaultFilters]);

  const pets: Pet[] = useAppSelector(getPets);

  const getPetData = (page: number): void => {
    dispatch(setPetsQueryParams({ ...petsFilters, page }));
    dispatch(getPetsAsync());
  };

  if (!isValidType) {
    return <>Wrong animal type</>;
  }

  return (
    <div className={styles["animals-wrapper"]}>
      <FiltersAnimals defaultFilters={defaultFilters!} />
      <InfiniteScroll
        data={pets}
        loading={loading}
        pagination={pagination}
        fetchData={getPetData}
        render={(params) => <CardsGrid {...params} />}
      />
    </div>
  );
};

export default Animals;
