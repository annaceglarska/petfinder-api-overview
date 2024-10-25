import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPetsAsync } from "../../slices/pets/pets.api-actions";
import {
  clearPets,
  clearPetsFilters,
  getPets,
  getPetsFilters,
  getPetsPaginationInfo,
  isPetsDataPending,
  setPetsQueryParams,
} from "../../slices/pets/pets.slice";
import { Pet } from "../../services/api/petfinder/pets/pets.types";
import { CardsGrid } from "../../components/cards-grid/CardsGrid";
import { useParams } from "react-router-dom";
import FiltersAnimals from "../../components/filters-animals/FiltersAnimals";
import styles from "./PetsInOrganization.module.css";
import { getOrganizationAsync } from "../../slices/organizations/organizations.api-actions";
import OrganizationHeader from "../../components/organization-header/OrganizationHeader";
import { InfiniteScroll } from "../../components/infinite-scroll/InfiniteScroll";
import CardSkeleton from "../../components/card-skeleton/CardSkeleton";

const PetsInOrganization: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      dispatch(setPetsQueryParams({ organization: params.id }));
      dispatch(getPetsAsync());
      dispatch(getOrganizationAsync(params.id));
    }

    return () => {
      dispatch(clearPets());
      dispatch(clearPetsFilters());
    };
  }, [params]);

  const petsInOrganization: Pet[] = useAppSelector(getPets);
  const loading: boolean = useAppSelector(isPetsDataPending);
  const pagination = useAppSelector(getPetsPaginationInfo);
  const petsFilters = useAppSelector(getPetsFilters);

  const getPetData = (page: number): void => {
    dispatch(setPetsQueryParams({ ...petsFilters, page }));
    dispatch(getPetsAsync());
  };

  return (
    <>
      <OrganizationHeader />
      <div className={styles["pets-in-organization__container"]}>
        <FiltersAnimals defaultFilters={{ organization: params.id }} />
        <InfiniteScroll
          data={petsInOrganization}
          loading={loading}
          pagination={pagination}
          fetchData={getPetData}
          render={(params) => (
            <CardsGrid
              {...params}
              isLoading={loading}
              skeleton={<CardSkeleton />}
              skeletonNumber={pagination?.count_per_page}
            />
          )}
        />
      </div>
    </>
  );
};

export default PetsInOrganization;
