import { useAppSelector } from "../../app/hooks";
import { getOrganization } from "../../slices/organizations/organizations.slice";
import styles from "./OrganizationHeader.module.css";

const OrganizationHeader = () => {
  const organization = useAppSelector(getOrganization);
  return (
    <div className={styles["organization-header__container"]}>
      <h1 className={styles["organization-header__container"]}>
        {organization?.name}
      </h1>
    </div>
  );
};

export default OrganizationHeader;
