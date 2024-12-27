import axios, { AxiosResponse } from "axios";
import { UserCredential } from "../../../../slices/user/user.types";
import { TokenInfoDTO, UserInfo, UserInfoDTO } from "./auth.types";
import TokenService from "../../../token/token";

class AuthApiService {
  constructor() {
    const url: string | undefined = process.env.REACT_APP_SERVER_BASE_URL;
    if (!url) {
      throw new Error("REST API url not defined")
    }
    this.baseUrl = url;
  }

  private baseUrl: string


  async login(userCredential: UserCredential): Promise<UserInfo> {
    try {
      const response = await axios.post<
        UserInfoDTO,
        AxiosResponse<UserInfoDTO>,
        UserCredential
      >(`${this.baseUrl}/login`, userCredential);
      TokenService.saveToken(response.data.data.token)
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async getPetfinderAuthorizationToken() {
    try {
      const response = await axios.post<TokenInfoDTO>(
        `${this.baseUrl}/get-access`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthApiService();
