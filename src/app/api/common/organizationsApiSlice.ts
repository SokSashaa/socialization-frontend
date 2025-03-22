import {apiSlice} from "../apiSlice";

const organizationsApiSlice = apiSlice.injectEndpoints?.({
    endpoints: (builder) => ({
        getOrganizations: builder.query({
            query: () => `/organizations/`,
        })
    })
})

export const {useGetOrganizationsQuery} = organizationsApiSlice
