import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  clearPetsFilters,
  getPetsFilters,
  setPetsQueryParams,
} from "../../slices/pets/pets.slice";
import { CardsGrid } from "../../components/cards-grid/CardsGrid";
import { useParams } from "react-router-dom";
import FiltersAnimals from "../../components/filters-animals/FiltersAnimals";
import styles from "./PetsInOrganization.module.css";
import OrganizationHeader from "../../components/organization-header/OrganizationHeader";
import { InfiniteScroll } from "../../components/infinite-scroll/InfiniteScroll";
import CardSkeleton from "../../components/card-skeleton/CardSkeleton";
import { useLazyGetPetsQuery } from "../../slices/pets/pets.api";
import { useLazyGetOrganizationByIdQuery } from "../../slices/organizations/organization.api";

const PetsInOrganization: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const [getOrganization, { data: organizationData }] =
    useLazyGetOrganizationByIdQuery();

  const [getPets, { data: petsData, isFetching: isPetsDataFetching }] =
    useLazyGetPetsQuery();

  useEffect(() => {
    if (params.id) {
      dispatch(setPetsQueryParams({ organization: params.id }));
      getPets();
      getOrganization(params.id);
    }

    return () => {
      dispatch(clearPetsFilters());
    };
  }, [params]);

  const petsFilters = useAppSelector(getPetsFilters);

  const getPetData = (page: number): void => {
    dispatch(setPetsQueryParams({ ...petsFilters, page }));
    getPets();
  };

  return (
    <>
      <OrganizationHeader
        organizationName={organizationData?.organization.name}
      />
      <div className={styles["pets-in-organization__container"]}>
        <FiltersAnimals fetchPets={getPets} />
        <InfiniteScroll
          data={petsData?.animals || []}
          loading={isPetsDataFetching}
          pagination={petsData?.pagination}
          fetchData={getPetData}
          render={(params) => (
            <CardsGrid
              {...params}
              isLoading={isPetsDataFetching}
              skeleton={<CardSkeleton />}
              skeletonNumber={petsData?.pagination?.count_per_page}
            />
          )}
        />
      </div>
    </>
  );
};

export default PetsInOrganization;
