import { useParams } from "react-router-dom";
import FrameAnimalDetails from "../../components/border-animal-details/FrameAnimalDetails";
import { Navigation } from "../../components/navigation/Navigation";
import styles from "./AnimalDetails.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { getPetAsync } from "../../slices/pets/pets.api-actions";
import {
  clearPet,
  getPet,
  isPetDataPending,
} from "../../slices/pets/pets.slice";
import { Pet } from "../../services/api/petfinder/pets/pets.types";
import { CircularProgress } from "@mui/material";
import { isPetfinderTokenReady } from "../../slices/config/config.slice";

const AnimalDetails = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const isPending: boolean = useAppSelector(isPetDataPending);
  const pet: Pet | undefined = useAppSelector(getPet);

  const isTokenReady = useAppSelector(isPetfinderTokenReady);

  useEffect(() => {
    if (!isTokenReady) {
      return;
    }

    if (params.id) {
      dispatch(getPetAsync(+params.id));
    }

    return () => {
      dispatch(clearPet());
    };
  }, [params, isTokenReady]);

  if (!isTokenReady) {
    return <CircularProgress className={styles["pet_details__progress"]} />;
  }

  return (
    <>
      <Navigation />
      <div className={styles["top-background"]}>
        <span className={styles["pet-details__span"]}>My name is</span>
        <h1 className={styles["pet_details__header"]}>{pet?.name}</h1>
      </div>
      {isPending ? (
        <CircularProgress className={styles["pet_details__progress"]} />
      ) : (
        <FrameAnimalDetails />
      )}
    </>
  );
};

export default AnimalDetails;
