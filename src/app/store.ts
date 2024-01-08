import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import petsReducer from "./../slices/pets/pets.slice";
import organizationReducer from "./../slices/organization/organization.slice";
import configReducer from "./../slices/config/config.slice";

export const store = configureStore({
  reducer: {
    pets: petsReducer,
    organization: organizationReducer,
    config: configReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
