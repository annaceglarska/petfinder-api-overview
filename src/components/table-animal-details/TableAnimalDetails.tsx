import { useAppSelector } from "../../app/hooks";
import { getPet } from "../../slices/pets/pets.slice";
import styles from "./TableAnimalDetails.module.css";
import { getAddressLabel } from "./helpers/TableAnimalDetails.helpers";
import { useTranslation } from "react-i18next";

export interface TableAnimalDetailsProps {}

const TableAnimalDetails: React.FC<TableAnimalDetailsProps> = () => {
  const pet = useAppSelector(getPet);
  const { t } = useTranslation();

  return (
    <>
      <ul className={styles["details__table"]}>
        <li>
          <strong>{t("NAME")}</strong>
          <span>{pet?.name}</span>
        </li>
        <li>
          <strong>{t("TYPE")}</strong>
          <span>{pet?.type}</span>
        </li>
        <li>
          <strong>{t("SPECIES")}</strong>
          <span>{pet?.species}</span>
        </li>
        <li>
          <strong>{t("AGE")}</strong>
          <span>{pet?.age}</span>
        </li>
        <li>
          <strong>{t("GENDER")}</strong>
          <span>{pet?.gender}</span>
        </li>
        <li>
          <strong>{t("SIZE")}</strong>
          <span>{pet?.size}</span>
        </li>
        <li>
          <strong>{t("COAT")}</strong>
          <span>{pet?.coat}</span>
        </li>
        <li>
          <strong>{t("TAGS")}</strong>
          <span>{pet?.tags.join(", ").toLowerCase()}</span>
        </li>
        <li>
          <strong>{t("DESCRIPTION")}</strong>
          <span>{pet?.description}</span>
        </li>
        <li>
          <strong>{t("STATUS")}</strong>
          <span>{pet?.status}</span>
        </li>
        <li>
          <strong>{t("STATUS_CHANGE_AT")}</strong>
          <span>
            {pet?.status_changed_at &&
              new Date(pet?.status_changed_at).toLocaleString()}
          </span>
        </li>
        <li>
          <strong>{t("PUBLISHED_AT")}</strong>
          <span>
            {pet?.published_at && new Date(pet?.published_at).toLocaleString()}
          </span>
        </li>
        <li>
          <strong>{t("BREEDS")}</strong>
          <span>
            {pet?.breeds &&
              `${pet?.breeds.primary}${
                pet.breeds.secondary ? `, ${pet.breeds.secondary}` : ""
              }`}
          </span>
        </li>
        <li>
          <strong>{t("COLOR")}</strong>
          <span>
            {pet?.colors &&
              `${pet?.colors.primary}${
                pet.colors.secondary ? `, ${pet.colors.secondary}` : ""
              }${pet.colors.tertiary ? `, ${pet.colors.tertiary}` : ""}`}
          </span>
        </li>

        <li>
          <strong>{t("CONTACT")}</strong>
          <span>{`${pet?.contact.email} ${
            pet?.contact.phone ? pet?.contact.phone : ""
          }`}</span>
        </li>
        <li>
          <strong>{t("ADDRESS")}</strong>
          <span>{getAddressLabel(pet?.contact.address)}</span>
        </li>
      </ul>
    </>
  );
};

export default TableAnimalDetails;
