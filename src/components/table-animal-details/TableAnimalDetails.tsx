import { useContext } from "react";
import { Pet } from "../../services/api/petfinder/pets/pets.types";
import styles from "./TableAnimalDetails.module.css";
import { getAddressLabel } from "./helpers/TableAnimalDetails.helpers";
import { useTranslation } from "react-i18next";
import { PetContext } from "../../contexts/PetContext";

export interface TableAnimalDetailsProps {}

const TableAnimalDetails: React.FC<TableAnimalDetailsProps> = () => {
  const { t } = useTranslation();
  const { petData } = useContext(PetContext);
  const {
    name,
    type,
    species,
    age,
    gender,
    size,
    coat,
    tags,
    description,
    status_changed_at,
    published_at,
    breeds,
    status,
    colors,
    contact,
  } = petData?.animal || {};

  return (
    <>
      <ul className={styles["details__table"]}>
        <li>
          <strong>{t("NAME")}</strong>
          <span>{name}</span>
        </li>
        <li>
          <strong>{t("TYPE")}</strong>
          <span>{type}</span>
        </li>
        <li>
          <strong>{t("SPECIES")}</strong>
          <span>{species}</span>
        </li>
        <li>
          <strong>{t("AGE")}</strong>
          <span>{age}</span>
        </li>
        <li>
          <strong>{t("GENDER")}</strong>
          <span>{gender}</span>
        </li>
        <li>
          <strong>{t("SIZE")}</strong>
          <span>{size}</span>
        </li>
        <li>
          <strong>{t("COAT")}</strong>
          <span>{coat}</span>
        </li>
        <li>
          <strong>{t("TAGS")}</strong>
          <span>{tags?.join(", ").toLowerCase()}</span>
        </li>
        <li>
          <strong>{t("DESCRIPTION")}</strong>
          <span>{description}</span>
        </li>
        <li>
          <strong>{t("STATUS")}</strong>
          <span>{status}</span>
        </li>
        <li>
          <strong>{t("STATUS_CHANGE_AT")}</strong>
          <span>
            {status_changed_at && new Date(status_changed_at).toLocaleString()}
          </span>
        </li>
        <li>
          <strong>{t("PUBLISHED_AT")}</strong>
          <span>{published_at && new Date(published_at).toLocaleString()}</span>
        </li>
        <li>
          <strong>{t("BREEDS")}</strong>
          <span>
            {breeds &&
              `${breeds.primary}${
                breeds.secondary ? `, ${breeds.secondary}` : ""
              }`}
          </span>
        </li>
        <li>
          <strong>{t("COLOR")}</strong>
          <span>
            {colors &&
              `${colors.primary}${
                colors.secondary ? `, ${colors.secondary}` : ""
              }${colors.tertiary ? `, ${colors.tertiary}` : ""}`}
          </span>
        </li>

        <li>
          <strong>{t("CONTACT")}</strong>
          <span>{`${contact?.email} ${
            contact?.phone ? contact?.phone : ""
          }`}</span>
        </li>
        <li>
          <strong>{t("ADDRESS")}</strong>
          <span>{getAddressLabel(contact?.address)}</span>
        </li>
      </ul>
    </>
  );
};

export default TableAnimalDetails;
