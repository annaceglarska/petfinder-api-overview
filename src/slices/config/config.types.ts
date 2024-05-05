import { TokenInfoDTO } from "../../services/api/backend/auth/auth.types";
import { DataContainer } from "../index.types";

export interface ConfigState {
  petfinderToken: DataContainer<TokenInfoDTO>;
}
