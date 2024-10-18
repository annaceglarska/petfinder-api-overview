import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Navigation } from "../../components/navigation/Navigation";
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
import { clearPets } from "../../slices/pets/pets.slice";

const OrganizationDetails = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const isTokenReady = useAppSelector(isPetfinderTokenReady);

  const organization: Organization | null = useAppSelector(getOrganization);
  const isPending: boolean = useAppSelector(isOrganizationDataPending);

  useEffect(() => {
    if (!isTokenReady) {
      return;
    }

    if (params.id) {
      dispatch(getOrganizationAsync(params.id));
      dispatch(getPetsAsync({ organization: organization?.id, limit: 5 }));
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
      <div className={styles["top-background"]}>
        <h1 className={styles["organization_details__header"]}>
          {organization?.name}
        </h1>
      </div>
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
