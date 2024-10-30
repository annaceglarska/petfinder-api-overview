import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useParams } from "react-router-dom";
import { getOrganizationAsync } from "../../slices/organizations/organizations.api-actions";
import {
  clearOrganization,
  isOrganizationDataPending,
} from "../../slices/organizations/organizations.slice";
import { CircularProgress } from "@mui/material";
import styles from "./OrganizationDetails.module.css";
import OrganizationDetailsContainer from "../../components/organization-details-container/OrganizationDetailsContainer";
import { setPetsQueryParams } from "../../slices/pets/pets.slice";
import OrganizationHeader from "../../components/organization-header/OrganizationHeader";
import { useLazyGetPetsQuery } from "../../slices/pets/pets.api";

const OrganizationDetails = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [getPets, { data: petsData, isLoading: isPetsDataLoading }] =
    useLazyGetPetsQuery();

  const isOrganizationPending: boolean = useAppSelector(
    isOrganizationDataPending
  );
  const isPending: boolean = isOrganizationPending && isPetsDataLoading;

  useEffect(() => {
    if (params.id) {
      dispatch(getOrganizationAsync(params.id));
      dispatch(setPetsQueryParams({ organization: params.id, limit: 5 }));
      getPets();
    }

    return () => {
      dispatch(clearOrganization());
    };
  }, [params.id]);

  return (
    <>
      <OrganizationHeader />
      {isPending ? (
        <CircularProgress
          className={styles["organization-details__progress"]}
        />
      ) : (
        <>{petsData && <OrganizationDetailsContainer data={petsData} />}</>
      )}
    </>
  );
};

export default OrganizationDetails;
