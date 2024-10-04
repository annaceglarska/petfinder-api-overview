import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPet } from "../../slices/pets/pets.slice";
import Localization from "../localization/Localization";
import { getOrganizationAsync } from "../../slices/organizations/organizations.api-actions";
import OrganizationInfo from "../organization-info/OrganizationInfo";
import OrganizationContactInfo from "../organization-contact-info/OrganizationContactInfo";

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
      <OrganizationContactInfo context={"pet"} />
    </>
  );
};

export default ContactPanel;
