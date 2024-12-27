import styles from "./OrganizationHeader.module.css";

export interface OrganizationHeaderProps {
  organizationName: string | undefined;
}

const OrganizationHeader: React.FC<OrganizationHeaderProps> = ({
  organizationName,
}) => {
  return (
    <div className={styles["organization-header__container"]}>
      <h1 className={styles["organization-header__container"]}>
        {organizationName}
      </h1>
    </div>
  );
};

export default OrganizationHeader;
