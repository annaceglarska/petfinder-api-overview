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
