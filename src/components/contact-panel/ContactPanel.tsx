import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPet } from "../../slices/pets/pets.slice";
import Localization from "../localization/Localization";
import { getOrganizationAsync } from "../../slices/organization/organization.api-actions";
import OrganizationInfo from "../organization-info/OrganizationInfo";

const ContactPanel: React.FC = () => {
  const pet = useAppSelector(getPet);
  const dispatch = useAppDispatch();
  const organizationId: string | undefined = pet?.organization_id;

  useEffect(() => {
    dispatch(getOrganizationAsync(organizationId));
  }, [organizationId]);

  return (
    <>
      <OrganizationInfo />
      <Localization />
    </>
  );
};

export default ContactPanel;
