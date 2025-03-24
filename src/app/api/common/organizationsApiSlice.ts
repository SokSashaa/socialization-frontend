import { apiSlice } from '../apiSlice';
import { organizations_dto } from '../../../dto/organizations.dto';

type OrganizationsResponse = {
    count: number;
    next: any;
    previous: any;
    results: organizations_dto[];
};

const organizationsApiSlice = apiSlice.injectEndpoints?.({
    endpoints: (builder) => ({
        getOrganizations: builder.query<organizations_dto[], void>({
            query: () => `/organizations/`,
            transformResponse: (res: OrganizationsResponse) => res.results,
        }),
    }),
});

export const { useGetOrganizationsQuery } = organizationsApiSlice;
