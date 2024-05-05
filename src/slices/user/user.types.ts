import { FormData } from "../../components/sign-in/SignIn.types";
import { UserInfo } from "../../services/api/backend/auth/auth.types";
import { DataContainer } from "../index.types";

export interface UserState {
  user: DataContainer<UserInfo>;
}

export type UserCredential = FormData;
