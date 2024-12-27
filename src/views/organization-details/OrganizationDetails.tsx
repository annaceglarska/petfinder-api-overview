import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import styles from "./OrganizationDetails.module.css";
import OrganizationDetailsContainer from "../../components/organization-details-container/OrganizationDetailsContainer";
import { setPetsQueryParams } from "../../slices/pets/pets.slice";
import OrganizationHeader from "../../components/organization-header/OrganizationHeader";
import { useLazyGetPetsQuery } from "../../slices/pets/pets.api";
import { useLazyGetOrganizationByIdQuery } from "../../slices/organizations/organization.api";

const OrganizationDetails = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [getPets, { data: petsData, isLoading: isPetsDataLoading }] =
    useLazyGetPetsQuery();
  const [
    getOrganization,
    { isFetching: isOrganizationPending, data: organization },
  ] = useLazyGetOrganizationByIdQuery();

  const isPending: boolean = isOrganizationPending && isPetsDataLoading;

  useEffect(() => {
    if (params.id) {
      getOrganization(params.id);
      dispatch(setPetsQueryParams({ organization: params.id, limit: 5 }));
      getPets();
    }
  }, [params.id]);

  return (
    <>
      <OrganizationHeader organizationName={organization?.organization.name} />
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
