export interface UserInfo {
  _id: string;
  email: string;
  token: string;
}

export interface UserInfoDTO {
  message: string;
  data: UserInfo;
}
