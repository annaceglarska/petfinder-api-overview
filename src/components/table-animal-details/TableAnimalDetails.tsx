import { Pet } from "../../services/api/petfinder/pets/pets.types";
import styles from "./TableAnimalDetails.module.css";
import { getAddressLabel } from "./helpers/TableAnimalDetails.helpers";

export interface TableAnimalDetailsProps {
  data: Pet | undefined;
}

const TableAnimalDetails: React.FC<TableAnimalDetailsProps> = ({ data }) => {
  return (
    <>
      <ul className={styles["details__table"]}>
        <li>
          <strong>Name</strong>
          <span>{data?.name}</span>
        </li>
        <li>
          <strong>Type</strong>
          <span>{data?.type}</span>
        </li>
        <li>
          <strong>Species</strong>
          <span>{data?.species}</span>
        </li>
        <li>
          <strong>Age</strong>
          <span>{data?.age}</span>
        </li>
        <li>
          <strong>Gender</strong>
          <span>{data?.gender}</span>
        </li>
        <li>
          <strong>Size</strong>
          <span>{data?.size}</span>
        </li>
        <li>
          <strong>Coat</strong>
          <span>{data?.coat}</span>
        </li>
        <li>
          <strong>Tags</strong>
          <span>{data?.tags.join(", ").toLowerCase()}</span>
        </li>
        <li>
          <strong>Description</strong>
          <span>{data?.description}</span>
        </li>
        <li>
          <strong>Status</strong>
          <span>{data?.status}</span>
        </li>
        <li>
          <strong>Status changed at</strong>
          <span>
            {data?.status_changed_at &&
              new Date(data?.status_changed_at).toLocaleString()}
          </span>
        </li>
        <li>
          <strong>Published at</strong>
          <span>
            {data?.published_at &&
              new Date(data?.published_at).toLocaleString()}
          </span>
        </li>
        <li>
          <strong>Breeds</strong>
          <span>
            {data?.breeds &&
              `${data?.breeds.primary}${
                data.breeds.secondary ? `, ${data.breeds.secondary}` : ""
              }`}
          </span>
        </li>
        <li>
          <strong>Colors</strong>
          <span>
            {data?.colors &&
              `${data?.colors.primary}${
                data.colors.secondary ? `, ${data.colors.secondary}` : ""
              }${data.colors.tertiary ? `, ${data.colors.tertiary}` : ""}`}
          </span>
        </li>

        <li>
          <strong>Contact</strong>
          <span>{`${data?.contact.email} ${
            data?.contact.phone ? data?.contact.phone : ""
          }`}</span>
        </li>
        <li>
          <strong>Address</strong>
          <span>{getAddressLabel(data?.contact.address)}</span>
        </li>
      </ul>
    </>
  );
};

export default TableAnimalDetails;
