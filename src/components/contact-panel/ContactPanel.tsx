import { useContext, useEffect } from "react";
import Localization from "../localization/Localization";
import OrganizationInfo from "../organization-info/OrganizationInfo";
import OrganizationContactInfo from "../organization-contact-info/OrganizationContactInfo";
import { PetContext } from "../../contexts/PetContext";
import { useLazyGetOrganizationByIdQuery } from "../../slices/organizations/organization.api";

export interface ContactPanelProps {}

const ContactPanel: React.FC<ContactPanelProps> = () => {
  const { petData } = useContext(PetContext);
  const organizationId: string | undefined = petData?.animal.organization_id;
  const [getOrganization, { data: organization }] =
    useLazyGetOrganizationByIdQuery();

  useEffect(() => {
    if (organizationId) {
      getOrganization(organizationId);
    }
  }, [organizationId]);

  return (
    <>
      <OrganizationInfo data={organization?.organization} />
      <Localization data={organization?.organization} />
      <OrganizationContactInfo
        context={"pet"}
        data={organization?.organization}
      />
    </>
  );
};

export default ContactPanel;
