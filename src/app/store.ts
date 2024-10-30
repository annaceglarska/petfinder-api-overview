import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import petsReducer from "./../slices/pets/pets.slice";
import organizationReducer from "../slices/organizations/organizations.slice";
import configReducer from "./../slices/config/config.slice";
import userReducer from "../slices/user/user.slice";
import petsApi from "./../slices/pets/pets.api"

export const store = configureStore({
  reducer: {
    pets: petsReducer,
    organization: organizationReducer,
    config: configReducer,
    user: userReducer,
    [petsApi.reducerPath]: petsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      petsApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
