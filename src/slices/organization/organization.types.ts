import { OrganizationDTO } from "../../services/api/organization/organization.type";
import { DataContainer } from "../index.types";

export interface OrganizationState {
  organizations: DataContainer<OrganizationDTO>;
}
