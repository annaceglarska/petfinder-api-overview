import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getOrganizationsAsync } from "../../slices/organizations/organizations.api-actions";
import {
  clearOrganizations,
  getOrganizations,
} from "../../slices/organizations/organizations.slice";
import { Organization } from "../../services/api/petfinder/organizations/organizations.type";
import { CardsGrid } from "../../components/cards-grid/CardsGrid";

export const Organizations: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getOrganizationsAsync({}));
    return () => {
      dispatch(clearOrganizations());
    };
  }, []);

  const organizations: Organization[] = useAppSelector(getOrganizations);

  return (
    <>
      <CardsGrid data={organizations} />
    </>
  );
};
