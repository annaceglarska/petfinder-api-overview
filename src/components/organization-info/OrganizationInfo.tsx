import React from "react";
import styles from "./OrganizationInfo.module.css";
import { getAddressLabel } from "../table-animal-details/helpers/TableAnimalDetails.helpers";
import { Organization } from "../../services/api/petfinder/organizations/organizations.type";

export interface OrganizationInfoProps {
  data: Organization | undefined;
}

const OrganizationInfo: React.FC<OrganizationInfoProps> = ({ data }) => {
  return (
    <div className={styles["organization-info__container"]}>
      <img src={data?.photos[0]?.medium} />
      <a href={`/organization/details/${data?.id}`}>{data?.name}</a>
      <p>{getAddressLabel(data?.address)}</p>
    </div>
  );
};

export default OrganizationInfo;
