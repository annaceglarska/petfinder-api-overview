export interface UserInfo {
  _id: string;
  email: string;
  name: string;
  phone: string;
  surname: string;
  token: string;
}

export interface UserInfoDTO {
  message: string;
  data: UserInfo;
}

export interface UserBasicInfoDTO {
  message: string;
  data: Omit<UserInfo, 'token'>;
}

export interface TokenInfoDTO {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export type UserData = Omit<UserInfo, "_id" | "token">;

export interface UserUpdatedInfoDTO {
  message: string;
  data: Omit<UserInfo, "token">;
}
