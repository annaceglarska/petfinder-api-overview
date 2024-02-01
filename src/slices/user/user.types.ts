import { FormData } from "../../components/sign-in/SignIn.types";
import { DataContainer } from "../index.types";

export interface UserState {
  user: DataContainer<any>;
}

export type UserCredential = FormData;
