import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Pagination as PetPagination } from "../../services/api/petfinder/pets/pets.types";

import { setPetsQueryParams } from "../../slices/pets/pets.slice";
import { CardsGrid } from "../../components/cards-grid/CardsGrid";
import { Pagination, PaginationItem, Stack } from "@mui/material";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers";
import CardSkeleton from "../../components/card-skeleton/CardSkeleton";
import { useGetPetsQuery } from "../../slices/pets/pets.api";

export const Pets: React.FC = () => {
  const dispatch = useAppDispatch();

  const [paginationData, setPaginationData] = useState<
    PetPagination | undefined
  >();

  const { data, isFetching, refetch } = useGetPetsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (data?.pagination) {
      setPaginationData(data.pagination);
    }
  }, [data]);

  const onChangeHandler = (e: React.ChangeEvent<unknown>, page: number) => {
    setPaginationData({
      ...(paginationData as PetPagination),
      current_page: page,
    });
    dispatch(setPetsQueryParams({ page }));
    refetch();
  };

  return (
    <>
      <CardsGrid
        data={isFetching ? [] : data?.animals || []}
        isLoading={isFetching}
        skeleton={<CardSkeleton />}
        skeletonNumber={paginationData?.count_per_page || 20}
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
