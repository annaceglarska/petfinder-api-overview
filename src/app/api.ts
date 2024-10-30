import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "./store";

export const basePetfinderQuery = fetchBaseQuery({
    baseUrl: 'https://api.petfinder.com/v2', prepareHeaders: (headers, api) => {
        const store = (api.getState() as RootState)
        const token: string | undefined = store.config
            .petfinderToken.value?.access_token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})