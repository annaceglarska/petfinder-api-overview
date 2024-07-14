import { Address } from "../../../services/api/petfinder/pets/pets.types";

export const getAddressLabel = (address: Address | undefined): string => Object.values(address || {}).filter(Boolean).join(', ')