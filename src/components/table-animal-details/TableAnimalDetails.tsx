import { useAppSelector } from "../../app/hooks";
import { getPet } from "../../slices/pets/pets.slice";
import styles from "./TableAnimalDetails.module.css";
import { getAddressLabel } from "./helpers/TableAnimalDetails.helpers";

export interface TableAnimalDetailsProps {}

const TableAnimalDetails: React.FC<TableAnimalDetailsProps> = () => {
  const pet = useAppSelector(getPet);
  return (
    <>
      <ul className={styles["details__table"]}>
        <li>
          <strong>Name</strong>
          <span>{pet?.name}</span>
        </li>
        <li>
          <strong>Type</strong>
          <span>{pet?.type}</span>
        </li>
        <li>
          <strong>Species</strong>
          <span>{pet?.species}</span>
        </li>
        <li>
          <strong>Age</strong>
          <span>{pet?.age}</span>
        </li>
        <li>
          <strong>Gender</strong>
          <span>{pet?.gender}</span>
        </li>
        <li>
          <strong>Size</strong>
          <span>{pet?.size}</span>
        </li>
        <li>
          <strong>Coat</strong>
          <span>{pet?.coat}</span>
        </li>
        <li>
          <strong>Tags</strong>
          <span>{pet?.tags.join(", ").toLowerCase()}</span>
        </li>
        <li>
          <strong>Description</strong>
          <span>{pet?.description}</span>
        </li>
        <li>
          <strong>Status</strong>
          <span>{pet?.status}</span>
        </li>
        <li>
          <strong>Status changed at</strong>
          <span>
            {pet?.status_changed_at &&
              new Date(pet?.status_changed_at).toLocaleString()}
          </span>
        </li>
        <li>
          <strong>Published at</strong>
          <span>
            {pet?.published_at && new Date(pet?.published_at).toLocaleString()}
          </span>
        </li>
        <li>
          <strong>Breeds</strong>
          <span>
            {pet?.breeds &&
              `${pet?.breeds.primary}${
                pet.breeds.secondary ? `, ${pet.breeds.secondary}` : ""
              }`}
          </span>
        </li>
        <li>
          <strong>Colors</strong>
          <span>
            {pet?.colors &&
              `${pet?.colors.primary}${
                pet.colors.secondary ? `, ${pet.colors.secondary}` : ""
              }${pet.colors.tertiary ? `, ${pet.colors.tertiary}` : ""}`}
          </span>
        </li>

        <li>
          <strong>Contact</strong>
          <span>{`${pet?.contact.email} ${
            pet?.contact.phone ? pet?.contact.phone : ""
          }`}</span>
        </li>
        <li>
          <strong>Address</strong>
          <span>{getAddressLabel(pet?.contact.address)}</span>
        </li>
      </ul>
    </>
  );
};

export default TableAnimalDetails;
