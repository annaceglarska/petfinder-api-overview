import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPetsAsync } from "../../slices/pets/pets.api-actions";
import {
  clearPets,
  clearPetsFilters,
  getPets,
  setPetsQueryParams,
} from "../../slices/pets/pets.slice";
import { Pet } from "../../services/api/petfinder/pets/pets.types";
import { CardsGrid } from "../../components/cards-grid/CardsGrid";
import { useParams } from "react-router-dom";
import FiltersAnimals from "../../components/filters-animals/FiltersAnimals";
import styles from "./PetsInOrganization.module.css";
import { getOrganizationAsync } from "../../slices/organizations/organizations.api-actions";
import OrganizationHeader from "../../components/organization-header/OrganizationHeader";

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

  return (
    <>
      <OrganizationHeader />
      <div className={styles["pets-in-organization__container"]}>
        <FiltersAnimals defaultFilters={{ organization: params.id }} />
        <CardsGrid data={petsInOrganization} />
      </div>
    </>
  );
};

export default PetsInOrganization;
