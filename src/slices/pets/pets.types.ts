import { PetsDTO } from "../../services/api/pets/pets.types";
import { DataContainer } from "../index.types";

export interface PetsState {
  pets: DataContainer<PetsDTO>;
}
