import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Pagination as PetPagination,
  Pet,
} from "../../services/api/petfinder/pets/pets.types";
import { getPetsAsync } from "../../slices/pets/pets.api-actions";
import {
  clearPets,
  countOfPetsPerPage,
  getPets,
  getPetsPaginationInfo,
  isPetsDataPending,
  setPetsQueryParams,
} from "../../slices/pets/pets.slice";
import { CardsGrid } from "../../components/cards-grid/CardsGrid";
import { Pagination, PaginationItem, Stack } from "@mui/material";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers";
import CardSkeleton from "../../components/card-skeleton/CardSkeleton";

export const Pets: React.FC = () => {
  const dispatch = useAppDispatch();
  const isPetsPending = useAppSelector(isPetsDataPending);
  const petsPaginationInfo = useAppSelector(getPetsPaginationInfo);
  const numberOfPetsPerPage = useAppSelector(countOfPetsPerPage);
  const [paginationData, setPaginationData] = useState<
    PetPagination | undefined
  >();

  useEffect(() => {
    dispatch(getPetsAsync());

    return () => {
      dispatch(clearPets());
    };
  }, []);

  useEffect(() => {
    if (petsPaginationInfo) {
      setPaginationData(petsPaginationInfo);
    }
  }, [petsPaginationInfo]);

  const pets: Pet[] = useAppSelector(getPets);

  const onChangeHandler = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(clearPets());
    setPaginationData({
      ...(paginationData as PetPagination),
      current_page: page,
    });
    dispatch(setPetsQueryParams({ page }));
    dispatch(getPetsAsync());
  };

  return (
    <>
      <CardsGrid
        data={pets}
        isLoading={isPetsPending}
        skeleton={<CardSkeleton />}
        skeletonNumber={numberOfPetsPerPage || 20}
      />
      <Stack
        spacing={2}
        sx={{ marginBottom: "25px", display: "flex", alignItems: "center" }}
      >
        <Pagination
          count={paginationData?.total_pages || 1}
          variant="outlined"
          color="primary"
          page={paginationData?.current_page || 1}
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
