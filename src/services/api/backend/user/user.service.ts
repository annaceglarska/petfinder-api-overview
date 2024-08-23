import axios, { AxiosResponse } from "axios";
import { UserData, UserInfo, UserUpdatedInfoDTO } from "../auth/auth.types";

const DEFAULT_SERVER_BASE_URL = "http://localhost:5000/api/v1/user";
class UserApiService {
  private baseUrl: string =
    process.env.REACT_APP_SERVER_BASE_URL || DEFAULT_SERVER_BASE_URL;

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
}

export default new UserApiService();
