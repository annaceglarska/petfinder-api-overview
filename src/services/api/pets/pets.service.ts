import axios from "axios";
import {
  AnimalType,
  AnimalTypesInfoDTO,
  PetsDTO,
  PetsQueryParams,
} from "./pets.types";

export const bearer: string =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJac3FPRnBrTjgxUGpucmMzb3g0bER4YXlGejR0SWM2VHdod0NkcmJCS2pNZTVPTERKeCIsImp0aSI6ImRhMWU2ODRmMTAxMGExYTQxNTA2M2IyOWEzMTlkMjQ0NTA2MmYxMDM0ZGZkOTBmOGVmOTRiMjA4NjRlYjI0NThlNjYyNmZkZGUyZjZmZTk1IiwiaWF0IjoxNzEzNzI1MjUwLCJuYmYiOjE3MTM3MjUyNTAsImV4cCI6MTcxMzcyODg1MCwic3ViIjoiIiwic2NvcGVzIjpbXX0.aAGhOvaumeKq6ZOatn45AKbqh5AFd6vqXdFYCjsyeVhlvMuy_m1fNtKaujTFQeoyf5mBTIzmnBs8wQNTI7i1cDin4ae-Tm_iFziuHjw1xNg5oujOvXH_EkbeyDJhGWBspI3ynxTN8COugacg_jnRykyCYBgVi_CyDQxObqo-bvC185bqF9JPeQdwshy3lkR91xbbQrnG4Ij0xGJc4nwmMwcvFlbfP5YUaHWaVaTeeVm6fuHPlnN_Yrt4BBTovlgaJtOpcvRdelbnT8e4mC3fzpxHaubgfQ2JEpVfk-5dVIErgK38v33PLd6flaQA1SBZlCyu4y9uXrDMjonf0jBkWQ";

export const baseUrl: string = "https://api.petfinder.com";

class PetsApiService {
  async getAnimals(params?: PetsQueryParams): Promise<PetsDTO | undefined> {
    try {
      const response = await axios.get<PetsDTO>(`${baseUrl}/v2/animals`, {
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
        params,
      });
      return response.data;
    } catch (error) {
      // ToDo: add notification
    }
  }

  async getAnimalTypes(
    type?: AnimalType
  ): Promise<AnimalTypesInfoDTO | undefined> {
    try {
      const response = await axios.get<AnimalTypesInfoDTO>(
        `${baseUrl}/v2/types${type ? `/${type}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${bearer}`,
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
