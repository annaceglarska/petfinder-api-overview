import { FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue, createApi } from '@reduxjs/toolkit/query/react'
import { AnimalType, AnimalTypesDetails, AnimalTypesInfoDTO, PetDTO, PetsDTO, PetsQueryParams } from '../../services/api/petfinder/pets/pets.types'
import { RootState } from '../../app/store';
import { basePetfinderQuery } from '../../app/api';

export const petsApi = createApi({
    reducerPath: 'api/pets',
    baseQuery: basePetfinderQuery,
    endpoints: (builder) => ({
        getPets: builder.query<PetsDTO, void>({
            queryFn(_, api, __, funBaseQuery) {
                const store = (api.getState() as RootState)
                const signal = api.signal
                const params: PetsQueryParams = store.pets.getPetsQueryParams || {}
                const query = funBaseQuery({
                    url: '/animals',
                    params,
                    signal
                })
                return query as Promise<QueryReturnValue<PetsDTO, FetchBaseQueryError, FetchBaseQueryMeta>>
            },

        }),
        getPetTypes: builder.query<AnimalTypesInfoDTO, void>({
            query: () => `/types`
        }),
        getPetType: builder.query<AnimalTypesDetails, AnimalType>({
            query: (type) => `/types/${type}`
        }),
        getPetById: builder.query<PetDTO, number>({
            query: (id) => `/animals/${id}`
        })
    })
})

export const {
    useGetPetByIdQuery,
    useGetPetTypeQuery,
    useGetPetTypesQuery,
    useGetPetsQuery,
    useLazyGetPetsQuery
} = petsApi

export default petsApi