import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Organization } from "../../services/api/petfinder/organization/organization.type";
import { Pet } from "../../services/api/petfinder/pets/pets.types";
import { getOrganizationAsync } from "../../slices/organization/organization.api-actions";
import {
  clearOrganizations,
  getOrganizations,
} from "../../slices/organization/organization.slice";
import { getPetsAsync } from "../../slices/pets/pets.api-actions";
import { clearPets, getPets } from "../../slices/pets/pets.slice";
import { CardsGrid } from "../../components/cards-grid/CardsGrid";

export const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPetsAsync({}));
    dispatch(getOrganizationAsync({}));
    return () => {
      dispatch(clearOrganizations());
      dispatch(clearPets());
    };
  }, []);

  const pets: Pet[] = useAppSelector(getPets);
  const organizations: Organization[] = useAppSelector(getOrganizations);

  return (
    <>
      <CardsGrid data={pets} />
      <CardsGrid data={organizations} />
    </>
  );
};
