import { Box, Container } from "@mui/material";
import { Pet } from "../../services/api/petfinder/pets/pets.types";
import AnimalPhotos from "../animal-photos/AnimalPhotos";
import TableAnimalDetails from "../table-animal-details/TableAnimalDetails";
import styles from "./FrameAnimalDetails.module.css";
import PetAttributes from "../pet-attributes/PetAttributes";

export interface FrameAnimalDetailsProps {
  data: Pet | undefined;
}

const FrameAnimalDetails: React.FC<FrameAnimalDetailsProps> = ({ data }) => {
  return (
    <Container maxWidth="lg">
      <div className={styles["animal-details__frame"]}>
        <div>
          {!!(data?.photos.length || data?.videos.length) && (
            <AnimalPhotos photos={data?.photos} videos={data?.videos} />
          )}

          <TableAnimalDetails data={data} />
          <PetAttributes data={data} />
        </div>
        <div>
          <Box>aside</Box>
        </div>
      </div>
    </Container>
  );
};

export default FrameAnimalDetails;
