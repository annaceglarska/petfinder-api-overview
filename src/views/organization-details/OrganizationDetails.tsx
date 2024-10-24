import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { isPetfinderTokenReady } from "../../slices/config/config.slice";
import { useParams } from "react-router-dom";
import { getOrganizationAsync } from "../../slices/organizations/organizations.api-actions";
import {
  clearOrganization,
  getOrganization,
  isOrganizationDataPending,
} from "../../slices/organizations/organizations.slice";
import { CircularProgress } from "@mui/material";
import styles from "./OrganizationDetails.module.css";
import { Organization } from "../../services/api/petfinder/organizations/organizations.type";
import OrganizationDetailsContainer from "../../components/organization-details-container/OrganizationDetailsContainer";
import { getPetsAsync } from "../../slices/pets/pets.api-actions";
import { clearPets, setPetsQueryParams } from "../../slices/pets/pets.slice";
import OrganizationHeader from "../../components/organization-header/OrganizationHeader";

const OrganizationDetails = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const isTokenReady = useAppSelector(isPetfinderTokenReady);

  const isPending: boolean = useAppSelector(isOrganizationDataPending);

  useEffect(() => {
    if (!isTokenReady) {
      return;
    }

    if (params.id) {
      dispatch(getOrganizationAsync(params.id));
      dispatch(setPetsQueryParams({ organization: params.id, limit: 5 }));
      dispatch(getPetsAsync());
    }

    return () => {
      dispatch(clearOrganization());
      dispatch(clearPets());
    };
  }, [params, isTokenReady]);

  if (!isTokenReady) {
    return (
      <CircularProgress className={styles["organization-details__progress"]} />
    );
  }

  return (
    <>
      <OrganizationHeader />
      {isPending ? (
        <CircularProgress
          className={styles["organization-details__progress"]}
        />
      ) : (
        <OrganizationDetailsContainer />
      )}
    </>
  );
};

export default OrganizationDetails;
