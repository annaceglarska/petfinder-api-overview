import axios from "axios";
import { OrganizationsDTO, OrganizationQueryParam, OrganizationDTO } from "./organizations.type";

export const baseUrl: string = 'https://api.petfinder.com'

class OrganizationsApiService {
  async getOrganizations(
    params: OrganizationQueryParam,
    token: string | undefined
  ): Promise<OrganizationsDTO | undefined> {
    try {
      const response = await axios.get<OrganizationsDTO>(
        `${baseUrl}/v2/organizations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params,
        }
      );
      return response.data;
    } catch (error) {
      // ToDo: add notification
    }
  }

  async getOrganizationById(id: string | undefined, token: string | undefined): Promise<OrganizationDTO | undefined> {
    try {
      const response = await axios.get<OrganizationDTO>(
        `${baseUrl}/v2/organizations${id ? `/${id}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      // ToDo: add notification
    }
  }
}


export default new OrganizationsApiService();
