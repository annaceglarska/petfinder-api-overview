import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  AnimalType,
  Pet,
  PetsQueryParams,
} from "../../services/api/petfinder/pets/pets.types";
import {
  clearPetsFilters,
  getPetsFilters,
  setPetsQueryParams,
} from "../../slices/pets/pets.slice";
import FiltersAnimals from "../../components/filters-animals/FiltersAnimals";
import styles from "./Animals.module.css";
import { useParams } from "react-router-dom";
import { getAnimalType, isValidAnimalType } from "./Animals.helpers";
import { InfiniteScroll } from "../../components/infinite-scroll/InfiniteScroll";
import { CardsGrid } from "../../components/cards-grid/CardsGrid";
import CardSkeleton from "../../components/card-skeleton/CardSkeleton";
import {
  useGetPetsQuery,
  useLazyGetPetsQuery,
} from "../../slices/pets/pets.api";
import { sendResetInfiniteScrollEvent } from "../../utils/Utils";

export const getDefaultAnimalsFilters = (
  type: AnimalType
): PetsQueryParams => ({ type });

const Animals: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [getPet, { data: petsData, isFetching }] = useLazyGetPetsQuery();

  const petsFilters = useAppSelector(getPetsFilters);

  const isValidType = useMemo<boolean>(() => {
    return isValidAnimalType(params.animalType!);
  }, [params]);

  const defaultFilters = useMemo<PetsQueryParams>(() => {
    const type = getAnimalType(params.animalType!);
    return type ? getDefaultAnimalsFilters(type) : {};
  }, [params]);

  useEffect(() => {
    dispatch(setPetsQueryParams(defaultFilters));
    getPet();
    setTimeout(() => {
      sendResetInfiniteScrollEvent();
    });

    return () => {
      dispatch(clearPetsFilters());
    };
  }, [defaultFilters]);

  const getPetData = (page: number): void => {
    dispatch(setPetsQueryParams({ ...petsFilters, page }));
    getPet();
  };

  if (!isValidType) {
    return <>Wrong animal type</>;
  }

  return (
    <div className={styles["animals-wrapper"]}>
      <FiltersAnimals defaultFilters={defaultFilters!} fetchPets={getPet} />
      <InfiniteScroll
        data={petsData?.animals || []}
        loading={isFetching}
        pagination={petsData?.pagination}
        fetchData={getPetData}
        render={(params) => (
          <CardsGrid
            {...params}
            isLoading={isFetching}
            skeleton={<CardSkeleton />}
            skeletonNumber={petsData?.pagination.count_per_page || 20}
          />
        )}
      />
    </div>
  );
};

export default Animals;
