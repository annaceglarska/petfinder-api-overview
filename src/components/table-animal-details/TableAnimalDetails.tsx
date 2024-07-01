import { Pet } from "../../services/api/petfinder/pets/pets.types";
import styles from "./TableAnimalDetails.module.css";
import Container from "@mui/material/Container";

export interface TableAnimalDetailsProps {
  data: Pet | undefined;
}

const keysToShow: string[] = [
  "name",
  "type",
  "species",
  "age",
  "gender",
  "size",
  "coat",
  "description",
  "status",
  "status_changed_at",
  "published_at",
];

const TableAnimalDetails: React.FC<TableAnimalDetailsProps> = (props) => {
  const petSimpleInfo: [string, any][] = props.data
    ? Object.entries(props.data).filter(([key]) => keysToShow.includes(key))
    : [];

  return (
    <>
      <Container maxWidth="md" disableGutters>
        <ul className={styles["details__table"]}>
          {petSimpleInfo.map(([label, value]) => (
            <li key={label}>
              <strong>{label}</strong>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
};

export default TableAnimalDetails;
