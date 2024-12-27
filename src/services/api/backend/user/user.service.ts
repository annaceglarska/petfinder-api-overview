import axios, { AxiosResponse } from "axios";
import { UserBasicInfoDTO, UserData, UserInfo, UserUpdatedInfoDTO } from "../auth/auth.types";

class UserApiService {
  constructor() {
    const url: string | undefined = process.env.REACT_APP_SERVER_BASE_URL;
    if (!url) {
      throw new Error("REST API url not defined")
    }
    this.baseUrl = url;
  }

  private baseUrl: string

  async editUserData(
    userData: UserData,
    token: string
  ): Promise<Omit<UserInfo, "token">> {
    try {
      const response = await axios.post<
        UserUpdatedInfoDTO,
        AxiosResponse<UserUpdatedInfoDTO>,
        UserData
      >(`${this.baseUrl}/edit-user`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async getUserData(
    token: string | undefined
  ): Promise<UserData> {
    try {
      const response = await axios.get<
        UserBasicInfoDTO
      >(`${this.baseUrl}/get-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserApiService();
