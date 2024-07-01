import { Pet } from "../../services/api/petfinder/pets/pets.types";
import AnimalPhotos from "../animal-photos/AnimalPhotos";
import TableAnimalDetails from "../table-animal-details/TableAnimalDetails";
import styles from "./FrameAnimalDetails.module.css";

export interface FrameAnimalDetailsProps {
  data: Pet | undefined;
}

const FrameAnimalDetails: React.FC<FrameAnimalDetailsProps> = (props) => {
  return (
    <div className={styles["animal-details__frame"]}>
      <AnimalPhotos />
      <TableAnimalDetails data={props.data} />
    </div>
  );
};

export default FrameAnimalDetails;
