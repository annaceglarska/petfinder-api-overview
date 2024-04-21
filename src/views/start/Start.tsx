import React, { useEffect } from "react";
// import { SignIn } from "../../components/sign-in/SignIn";
import { Navigation } from "../../components/navigation/Navigation";
import { Hero } from "../../components/hero/Hero";
import { CardsGrid } from "../../components/cards-grid/CardsGrid";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPetsAsync } from "../../slices/pets/pets.api-actions";
import { getPets } from "../../slices/pets/pets.slice";
import { Pet } from "../../services/api/pets/pets.types";
import { getOrganizationAsync } from "../../slices/organization/organization.api-actions";
import { Organization } from "../../services/api/organization/organization.type";
import { getOrganizations } from "../../slices/organization/organization.slice";

const Start: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPetsAsync());
    dispatch(getOrganizationAsync());
  }, []);

  const pets: Pet[] = useAppSelector(getPets);
  const organizations: Organization[] = useAppSelector(getOrganizations);

  return (
    <>
      <Navigation />
      <Hero />
      <CardsGrid data={pets} />
      <CardsGrid data={organizations} />
      {/* <SignIn /> */}
    </>
  );
};

export default Start;
