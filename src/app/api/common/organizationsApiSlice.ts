import { organizations_dto } from '@dto/organizations.dto';

import { apiSlice } from '../apiSlice';

type OrganizationsResponse = {
    count: number;
    next: any;
    previous: any;
    results: organizations_dto[];
};

export const BASE_URL_ORGANIZATIONS = '/organizations/';

export const organizationsApiSlice = apiSlice.injectEndpoints?.({
    endpoints: (builder) => ({
        getAllOrganizations: builder.query<organizations_dto[], string>({
            query: (value: string) => ({
                url: `${BASE_URL_ORGANIZATIONS}?search=${value}`,
                method: 'GET',
            }),
            transformResponse: (res: OrganizationsResponse) => res.results,
            providesTags: ['Organizations'],
        }),
        getOrganizationInfo: builder.query({
            query: (id: string) => ({
                url: `${BASE_URL_ORGANIZATIONS + id}/`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useGetAllOrganizationsQuery,
    useLazyGetAllOrganizationsQuery,
    useGetOrganizationInfoQuery,
} = organizationsApiSlice;
