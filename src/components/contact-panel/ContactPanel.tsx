import { useContext, useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import Localization from "../localization/Localization";
import { getOrganizationAsync } from "../../slices/organizations/organizations.api-actions";
import OrganizationInfo from "../organization-info/OrganizationInfo";
import OrganizationContactInfo from "../organization-contact-info/OrganizationContactInfo";
import { PetContext } from "../../contexts/PetContext";

export interface ContactPanelProps {}

const ContactPanel: React.FC<ContactPanelProps> = () => {
  const { petData } = useContext(PetContext);
  const organizationId: string | undefined = petData?.animal.organization_id;
  const dispatch = useAppDispatch();

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
