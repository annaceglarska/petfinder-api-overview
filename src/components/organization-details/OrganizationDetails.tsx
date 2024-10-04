import { useAppSelector } from "../../app/hooks";
import { getOrganization } from "../../slices/organizations/organizations.slice";
import Localization from "../localization/Localization";
import OrganizationContactInfo from "../organization-contact-info/OrganizationContactInfo";
import OrganizationOpenHours from "../organization-open-hours/OrganizationOpenHours";
import { getAddressLabel } from "../table-animal-details/helpers/TableAnimalDetails.helpers";

const OrganizationDetails = () => {
  const organization = useAppSelector(getOrganization);
  return (
    <div>
      <p>{getAddressLabel(organization?.address)}</p>
      <OrganizationOpenHours />
      <Localization />
      <OrganizationContactInfo context={"organization"} />
    </div>
  );
};

export default OrganizationDetails;
