import { SignInFormData } from "../../components/sign-in/SignIn.types";
import { UserInfo } from "../../services/api/backend/auth/auth.types";
import { DataContainer, DataLoadingStatus } from "../index.types";

export interface UserState {
  user: DataContainer<UserInfo>;
  editionStatus: DataLoadingStatus | "unset";
  editionError: any;
}

export type UserCredential = SignInFormData;
