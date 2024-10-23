import {
  AnimalTypesInfoDTO,
  PetDTO,
  PetsDTO,
  PetsQueryParams,
} from "../../services/api/petfinder/pets/pets.types";
import { DataContainer } from "../index.types";

export interface PetsState {
  pets: DataContainer<PetsDTO, undefined, PetsQueryParams>;
  types: DataContainer<AnimalTypesInfoDTO>;
  pet: DataContainer<PetDTO>;
}
