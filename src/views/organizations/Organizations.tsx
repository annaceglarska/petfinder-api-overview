import { useEffect, useState } from "react";
import { OrganizationQueryParam } from "../../services/api/petfinder/organizations/organizations.type";
import { CardsGrid } from "../../components/cards-grid/CardsGrid";
import { Pagination, PaginationItem, Stack } from "@mui/material";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers";
import { Pagination as OrganizationPagination } from "../../services/api/petfinder/pets/pets.types";
import CardSkeleton from "../../components/card-skeleton/CardSkeleton";
import { useGetOrganizationsQuery } from "../../slices/organizations/organization.api";

export const Organizations: React.FC = () => {
  const [organizationFilters, setOrganizationFilters] =
    useState<OrganizationQueryParam>({});

  const {
    data: organizationsData,
    isFetching: isOrganizationsDataPending,
    refetch: refetchOrganizations,
  } = useGetOrganizationsQuery(organizationFilters, {
    refetchOnMountOrArgChange: true,
  });
  const organizationsPaginationInfo: OrganizationPagination | undefined =
    organizationsData?.pagination;

  const [paginationData, setPaginationData] = useState<
    OrganizationPagination | undefined
  >();

  useEffect(() => {
    if (organizationsPaginationInfo) {
      setPaginationData(organizationsPaginationInfo);
    }
  }, [organizationsPaginationInfo]);

  const onChangeHandler = (e: React.ChangeEvent<unknown>, page: number) => {
    setPaginationData({
      ...(paginationData as OrganizationPagination),
      current_page: page,
    });
    setOrganizationFilters({ page });
    refetchOrganizations();
  };

  return (
    <>
      <CardsGrid
        data={
          isOrganizationsDataPending
            ? []
            : organizationsData?.organizations || []
        }
        isLoading={isOrganizationsDataPending}
        skeleton={<CardSkeleton />}
        skeletonNumber={organizationsPaginationInfo?.count_per_page || 20}
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
