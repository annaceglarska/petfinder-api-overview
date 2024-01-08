import axios from "axios";
import { PetsDTO, PetsQueryParams } from "./pets.types";

class PetsApiService {
  private baseUrl: string = "https://api.petfinder.com/v2";

  async getAnimals(params?: PetsQueryParams): Promise<PetsDTO | undefined> {
    try {
      const response = await axios.get<PetsDTO>(`${this.baseUrl}/animals`, {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJac3FPRnBrTjgxUGpucmMzb3g0bER4YXlGejR0SWM2VHdod0NkcmJCS2pNZTVPTERKeCIsImp0aSI6IjZiNWIxZjQwNjRiNjI0OTFiMWRjOGY2ZTQwZjA2MDBjNjBjNWNkNzk4MTViODJhODA3YjQ2MTI3NGUxOGI0N2E2NDhhMTM4ODA0ZjE0NmUyIiwiaWF0IjoxNzA0NzE5MDk0LCJuYmYiOjE3MDQ3MTkwOTQsImV4cCI6MTcwNDcyMjY5NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.wKunesx---w7y05TWEki3Xq-r0WWCcTsrBIAg97_D-4wbF_FTctdMZzVO1TrC6u3rEOFjTSOJIZ6YA3OO0NLeI_hWrURy3fsi-P8-z527T1yp1JAg_P8mCJbJljyu275QZQ7P1UBjKStNkP8pafOAn1t7KBd7F_ImChyAgKqPM_hE2uWnoXFMC6ja04XRtlOvK9x9853OzDKE6fZlG0qJzRmNP6SwUfVkJ1-h7u1rzLFduI-GWZPs5CxlKCnWxGqISD-neDpDShC_M2T79gBeqhcKZiBkNpBIrYiJegEYIsQxUn8-zaIDyVrLPjyWWrixSKUFG58tkAeulFXWlwaFA`,
        },
        params,
      });
      return response.data;
    } catch (error) {
      // ToDo: add notification
    }
  }
}

export default new PetsApiService();
