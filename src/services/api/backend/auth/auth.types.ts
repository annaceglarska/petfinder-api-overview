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

export interface TokenInfoDTO {
  access_token: string;
  expires_in: number;
  token_type: string;
}
