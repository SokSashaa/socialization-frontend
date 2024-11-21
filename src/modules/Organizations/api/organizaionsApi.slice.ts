import { apiSlice } from '../../../app/api/apiSlice';

const organizationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrganizations: builder.query({
            query: () => ({
                url: '/organizations/',
                method: 'GET',
                transformResponse: (res)=>res.results
            }),
        }),
    }),
});

export const { useGetAllOrganizations } = organizationApiSlice;
