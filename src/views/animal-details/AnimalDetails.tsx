import { useParams } from "react-router-dom";
import AnimalDetailsContainer from "../../components/animal-details-container/AnimalDetailsContainer";
import styles from "./AnimalDetails.module.css";
import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetPetByIdQuery } from "../../slices/pets/pets.api";
import { PetContext } from "../../contexts/PetContext";

const AnimalDetails = () => {
  const params = useParams();
  const { t } = useTranslation();
  const { isLoading: isPetDataLoading, data: petData } = useGetPetByIdQuery(
    +params.id!
  );

  return (
    <PetContext.Provider value={{ petData }}>
      <div className={styles["top-background"]}>
        <span className={styles["pet-details__span"]}>{t("MY_NAME_IS")}</span>
        <h1 className={styles["pet_details__header"]}>
          {petData?.animal.name}
        </h1>
      </div>
      {isPetDataLoading ? (
        <CircularProgress className={styles["pet_details__progress"]} />
      ) : (
        <AnimalDetailsContainer />
      )}
    </PetContext.Provider>
  );
};

export default AnimalDetails;
