import axios from "axios";
import { OrganizationDTO, OrganizationQueryParam } from "./organization.type";
import { baseUrl, bearer } from "../pets/pets.service";

class OrganizationApiService {
  async getOrganization(
    params?: OrganizationQueryParam
  ): Promise<OrganizationDTO | undefined> {
    try {
      const response = await axios.get<OrganizationDTO>(
        `${baseUrl}/v2/organizations`,
        {
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
          params,
        }
      );
      return response.data;
    } catch (error) {
      // ToDo: add notification
    }
  }
}

export default new OrganizationApiService();
