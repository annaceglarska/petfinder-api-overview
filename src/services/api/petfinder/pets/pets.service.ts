import axios from "axios";
import {
  AnimalType,
  AnimalTypesInfoDTO,
  PetDTO,
  PetsDTO,
  PetsQueryParams,
} from "./pets.types";

export const baseUrl: string = "https://api.petfinder.com";

class PetsApiService {
  async getAnimals(
    params: PetsQueryParams,
    token: string | undefined
  ): Promise<PetsDTO | undefined> {
    try {
      const response = await axios.get<PetsDTO>(`${baseUrl}/v2/animals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });
      return response.data;
    } catch (error) {
      // ToDo: add notification
    }
  }

  async getAnimalTypes(
    type: AnimalType | null,
    token: string | undefined
  ): Promise<AnimalTypesInfoDTO | undefined> {
    try {
      const response = await axios.get<AnimalTypesInfoDTO>(
        `${baseUrl}/v2/types${type ? `/${type}` : ""}`,
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

  async getAnimalById(
    id: number | null,
    token: string | undefined
  ): Promise<PetDTO | undefined> {
    try {
      const response = await axios.get<PetDTO>(
        `${baseUrl}/v2/animals${id ? `/${id}` : ""}`,
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

export default new PetsApiService();
