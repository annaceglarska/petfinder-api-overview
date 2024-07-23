import { Container } from "@mui/material";
import AnimalPhotos from "../animal-photos/AnimalPhotos";
import TableAnimalDetails from "../table-animal-details/TableAnimalDetails";
import styles from "./FrameAnimalDetails.module.css";
import PetAttributes from "../pet-attributes/PetAttributes";
import ContactPanel from "../contact-panel/ContactPanel";
import { useAppSelector } from "../../app/hooks";
import { getPet } from "../../slices/pets/pets.slice";

export interface FrameAnimalDetailsProps {}

const FrameAnimalDetails: React.FC<FrameAnimalDetailsProps> = () => {
  const pet = useAppSelector(getPet);

  return (
    <Container maxWidth="lg">
      <div className={styles["animal-details__frame"]}>
        <div>
          {!!(pet?.photos.length || pet?.videos.length) && (
            <AnimalPhotos photos={pet?.photos} videos={pet?.videos} />
          )}

          <TableAnimalDetails />
          <PetAttributes />
        </div>
        <div>
          <ContactPanel />
        </div>
      </div>
    </Container>
  );
};

export default FrameAnimalDetails;
