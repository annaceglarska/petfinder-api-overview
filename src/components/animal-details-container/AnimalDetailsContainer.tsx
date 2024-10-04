import { Container } from "@mui/material";
import PhotosCarousel from "../photos-carousel/PhotosCarousel";
import TableAnimalDetails from "../table-animal-details/TableAnimalDetails";
import styles from "./AnimalDetailsContainer.module.css";
import PetAttributes from "../pet-attributes/PetAttributes";
import ContactPanel from "../contact-panel/ContactPanel";
import { useAppSelector } from "../../app/hooks";
import { getPet } from "../../slices/pets/pets.slice";

export interface FrameAnimalDetailsProps {}

const AnimalDetailsContainer: React.FC<FrameAnimalDetailsProps> = () => {
  const pet = useAppSelector(getPet);

  return (
    <Container maxWidth="lg">
      <div className={styles["animal-details__container"]}>
        <div>
          {!!(pet?.photos.length || pet?.videos.length) && (
            <PhotosCarousel photos={pet?.photos} videos={pet?.videos} />
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

export default AnimalDetailsContainer;
