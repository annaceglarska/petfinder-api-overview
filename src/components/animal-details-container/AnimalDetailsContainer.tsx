import { Container } from "@mui/material";
import PhotosCarousel from "../photos-carousel/PhotosCarousel";
import TableAnimalDetails from "../table-animal-details/TableAnimalDetails";
import styles from "./AnimalDetailsContainer.module.css";
import PetAttributes from "../pet-attributes/PetAttributes";
import ContactPanel from "../contact-panel/ContactPanel";
import { useContext } from "react";
import { PetContext } from "../../contexts/PetContext";

export interface FrameAnimalDetailsProps {}

const AnimalDetailsContainer: React.FC<FrameAnimalDetailsProps> = () => {
  const { petData } = useContext(PetContext);
  return (
    <Container maxWidth="lg">
      <div className={styles["animal-details__container"]}>
        <div>
          {!!(
            petData?.animal.photos.length || petData?.animal.videos.length
          ) && (
            <PhotosCarousel
              photos={petData?.animal.photos}
              videos={petData?.animal.videos}
            />
          )}
          <div className={styles["animal-details__attributes"]}>
            <TableAnimalDetails />
            <PetAttributes />
          </div>
        </div>
        <div>
          <ContactPanel />
        </div>
      </div>
    </Container>
  );
};

export default AnimalDetailsContainer;
