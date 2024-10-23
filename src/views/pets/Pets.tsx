import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Pet } from "../../services/api/petfinder/pets/pets.types";
import { getPetsAsync } from "../../slices/pets/pets.api-actions";
import {
  clearPets,
  getPets,
  getPetsPaginationInfo,
  isPetsDataPending,
  setPetsQueryParams,
} from "../../slices/pets/pets.slice";
import { CardsGrid } from "../../components/cards-grid/CardsGrid";
import {
  CircularProgress,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import styles from "./Pets.module.css";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers";

export const Pets: React.FC = () => {
  const dispatch = useAppDispatch();
  const isPetsPending = useAppSelector(isPetsDataPending);
  const petsPaginationInfo = useAppSelector(getPetsPaginationInfo);

  useEffect(() => {
    dispatch(getPetsAsync());

    return () => {
      dispatch(clearPets());
    };
  }, []);

  const pets: Pet[] = useAppSelector(getPets);

  const onChangeHandler = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(clearPets());
    dispatch(setPetsQueryParams({ page }));
    dispatch(getPetsAsync());
  };

  if (isPetsPending) {
    return <CircularProgress className={styles["pets__progress"]} />;
  }

  return (
    <>
      <CardsGrid data={pets} />
      <Stack
        spacing={2}
        sx={{ marginBottom: "25px", display: "flex", alignItems: "center" }}
      >
        <Pagination
          count={petsPaginationInfo?.total_pages}
          variant="outlined"
          color="primary"
          page={petsPaginationInfo?.current_page}
          onChange={onChangeHandler}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowLeftIcon, next: ArrowRightIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    </>
  );
};
