import { useEffect } from "react";
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
import {
  CircularProgress,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import styles from "./Organization.module.css";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers";

export const Organizations: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOrganizationPending = useAppSelector(isOrganizationsDataPending);

  useEffect(() => {
    dispatch(getOrganizationsAsync({}));
    return () => {
      dispatch(clearOrganizations());
    };
  }, []);

  const organizations: Organization[] = useAppSelector(getOrganizations);
  const organizationsPagination = useAppSelector(
    getOrganizationsPaginationInfo
  );

  const onChangeHandler = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(clearOrganizations());
    dispatch(getOrganizationsAsync({ page: page }));
  };

  if (isOrganizationPending) {
    return <CircularProgress className={styles["organizations__progress"]} />;
  }

  return (
    <>
      <CardsGrid data={organizations} />
      <Stack
        spacing={2}
        sx={{ marginBottom: "25px", display: "flex", alignItems: "center" }}
      >
        <Pagination
          count={organizationsPagination?.total_pages}
          variant="outlined"
          color="primary"
          page={organizationsPagination?.current_page}
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
