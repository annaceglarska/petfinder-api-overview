import { createApi } from '@reduxjs/toolkit/query/react';
import { basePetfinderQuery } from '../../app/api';
import { OrganizationDTO, OrganizationQueryParam, OrganizationsDTO } from '../../services/api/petfinder/organizations/organizations.type';

export const organizationApi = createApi({
    reducerPath: 'api/organization',
    baseQuery: basePetfinderQuery,
    endpoints: (builder) => ({
        getOrganizations: builder.query<OrganizationsDTO, OrganizationQueryParam | void>({
            query: (params) => `/organizations?${new URLSearchParams((params || {}) as Record<string, string>)}`
        }),
        getOrganizationById: builder.query<OrganizationDTO, string>({
            query: (id) => `/organizations/${id}`
        })
    })
})

export const {
    useGetOrganizationByIdQuery,
    useGetOrganizationsQuery,
    useLazyGetOrganizationByIdQuery,
} = organizationApi

export const { useQueryState: useGetOrganizationByIdQueryState } = organizationApi.endpoints.getOrganizationById

export default organizationApi