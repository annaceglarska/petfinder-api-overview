import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPetsAsync } from "../../slices/pets/pets.api-actions";
import { clearPets, getPets } from "../../slices/pets/pets.slice";
import { Pet } from "../../services/api/petfinder/pets/pets.types";
import { CardsGrid } from "../../components/cards-grid/CardsGrid";
import { useParams } from "react-router-dom";
import FiltersAnimals from "../../components/filters-animals/FiltersAnimals";
import styles from "./PetsInOrganization.module.css";
import OrganizationDetails from "../organization-details/OrganizationDetails";
import { getOrganizationAsync } from "../../slices/organizations/organizations.api-actions";
import { getOrganization } from "../../slices/organizations/organizations.slice";
import { Organization } from "../../services/api/petfinder/organizations/organizations.type";

const PetsInOrganization: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      dispatch(getPetsAsync({ organization: params.id }));
      dispatch(getOrganizationAsync(params.id));
    }

    return () => {
      dispatch(clearPets());
    };
  }, [params]);

  const petsInOrganization: Pet[] = useAppSelector(getPets);
  const organization: Organization | null = useAppSelector(getOrganization);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>{organization?.name}</h1>
      <div className={styles["pets-in-organization__container"]}>
        <FiltersAnimals defaultFilters={{ organization: params.id }} />
        <CardsGrid data={petsInOrganization} />
      </div>
    </>
  );
};

export default PetsInOrganization;
