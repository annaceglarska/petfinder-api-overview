import { OrganizationDTO, OrganizationsDTO } from "../../services/api/petfinder/organization/organization.type";
import { DataContainer } from "../index.types";

export interface OrganizationState {
  organizations: DataContainer<OrganizationsDTO>;
  organization: DataContainer<OrganizationDTO>;
}
