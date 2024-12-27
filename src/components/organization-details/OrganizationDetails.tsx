import Localization from "../localization/Localization";
import OrganizationContactInfo from "../organization-contact-info/OrganizationContactInfo";
import OrganizationOpenHours from "../organization-open-hours/OrganizationOpenHours";
import { getAddressLabel } from "../table-animal-details/helpers/TableAnimalDetails.helpers";
import SocialMediaLinks from "../social-media-links/SocialMediaLinks";
import { useParams } from "react-router-dom";
import { useGetOrganizationByIdQueryState } from "../../slices/organizations/organization.api";

const OrganizationDetails: React.FC = () => {
  const params = useParams();
  const { data: organization } = useGetOrganizationByIdQueryState(params.id!);
  return (
    <div>
      <p>{getAddressLabel(organization?.organization.address)}</p>
      <OrganizationOpenHours />
      <Localization data={organization?.organization} />
      <OrganizationContactInfo
        context={"organization"}
        data={organization?.organization}
      />
      <SocialMediaLinks />
    </div>
  );
};

export default OrganizationDetails;
