import React from "react";
import { useAppSelector } from "../../app/hooks";
import { getOrganization } from "../../slices/organizations/organizations.slice";
import styles from "./OrganizationInfo.module.css";
import { getAddressLabel } from "../table-animal-details/helpers/TableAnimalDetails.helpers";

const OrganizationInfo: React.FC = () => {
  const organization = useAppSelector(getOrganization);
  return (
    <div className={styles["organization-info__container"]}>
      <img src={organization?.photos[0]?.medium} />
      <a href={`/organization/details/${organization?.id}`}>
        {organization?.name}
      </a>
      <p>{getAddressLabel(organization?.address)}</p>
    </div>
  );
};

export default OrganizationInfo;
