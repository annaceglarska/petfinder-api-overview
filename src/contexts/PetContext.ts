import { createContext } from "react";
import { PetDTO } from "../services/api/petfinder/pets/pets.types";

export interface PetContextValue {
    petData: PetDTO | undefined;
}

export const PetContext = createContext<PetContextValue>({
    petData: undefined,
});