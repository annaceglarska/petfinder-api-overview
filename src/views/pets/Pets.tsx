import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Pet } from "../../services/api/petfinder/pets/pets.types";
import { getPetsAsync } from "../../slices/pets/pets.api-actions";
import { clearPets, getPets } from "../../slices/pets/pets.slice";
import { CardsGrid } from "../../components/cards-grid/CardsGrid";

export const Pets: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPetsAsync({}));

    return () => {
      dispatch(clearPets());
    };
  }, []);

  const pets: Pet[] = useAppSelector(getPets);

  return (
    <>
      <CardsGrid data={pets} />
    </>
  );
};
