import { OrganizationDTO, OrganizationsDTO } from "../../services/api/petfinder/organizations/organizations.type";
import { DataContainer } from "../index.types";

export interface OrganizationState {
  organizations: DataContainer<OrganizationsDTO>;
  organization: DataContainer<OrganizationDTO>;
}
