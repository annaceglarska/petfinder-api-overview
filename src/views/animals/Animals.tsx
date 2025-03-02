import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  AnimalType,
  PetsQueryParams,
} from "../../services/api/petfinder/pets/pets.types";
import {
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
import { useLazyGetPetsQuery } from "../../slices/pets/pets.api";
import { sendResetInfiniteScrollEvent } from "../../utils/Utils";
import { useTranslation } from "react-i18next";

export const getDefaultAnimalsFilters = (
  type: AnimalType
): PetsQueryParams => ({ type });

const Animals: React.FC = () => {
  const { t } = useTranslation();
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
    const currentFilters = { ...petsFilters, ...defaultFilters };
    const isFiltersChange = Object.entries(currentFilters).some(
      ([key, value]) => value !== petsFilters[key as keyof PetsQueryParams]
    );
    if (!isFiltersChange) {
      return;
    }
    dispatch(setPetsQueryParams(currentFilters));
    getPet();
    setTimeout(() => {
      sendResetInfiniteScrollEvent();
    });
  }, [defaultFilters, dispatch, getPet, petsFilters]);

  const getPetData = (page: number): void => {
    dispatch(setPetsQueryParams({ ...petsFilters, page }));
    getPet();
  };

  if (!isValidType) {
    return <>Wrong animal type</>;
  }

  return (
    <div className={styles["animals-wrapper"]}>
      <FiltersAnimals fetchPets={getPet} />
      {petsData?.animals.length === 0 ? (
        <h1 className={styles["animals__info"]}>{t("NO_PETS_INFO")}</h1>
      ) : (
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
      )}
    </div>
  );
};

export default Animals;
