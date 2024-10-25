import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getOrganizationsAsync } from "../../slices/organizations/organizations.api-actions";
import {
  clearOrganizations,
  getOrganizations,
  getOrganizationsPaginationInfo,
  isOrganizationsDataPending,
} from "../../slices/organizations/organizations.slice";
import { Organization } from "../../services/api/petfinder/organizations/organizations.type";
import { CardsGrid } from "../../components/cards-grid/CardsGrid";
import { Pagination, PaginationItem, Stack } from "@mui/material";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers";
import { Pagination as OrganizationPagination } from "../../services/api/petfinder/pets/pets.types";
import CardSkeleton from "../../components/card-skeleton/CardSkeleton";

export const Organizations: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOrganizationPending = useAppSelector(isOrganizationsDataPending);
  const organizationPaginationInfo = useAppSelector(
    getOrganizationsPaginationInfo
  );
  const [paginationData, setPaginationData] = useState<
    OrganizationPagination | undefined
  >();

  useEffect(() => {
    dispatch(getOrganizationsAsync({}));
    return () => {
      dispatch(clearOrganizations());
    };
  }, []);

  useEffect(() => {
    if (organizationPaginationInfo) {
      setPaginationData(organizationPaginationInfo);
    }
  }, [organizationPaginationInfo]);

  const organizations: Organization[] = useAppSelector(getOrganizations);
  const organizationsPagination = useAppSelector(
    getOrganizationsPaginationInfo
  );

  const onChangeHandler = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(clearOrganizations());
    setPaginationData({
      ...(paginationData as OrganizationPagination),
      current_page: page,
    });
    dispatch(getOrganizationsAsync({ page: page }));
  };

  return (
    <>
      <CardsGrid
        data={organizations}
        isLoading={isOrganizationPending}
        skeleton={<CardSkeleton />}
        skeletonNumber={organizationPaginationInfo?.count_per_page || 20}
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
