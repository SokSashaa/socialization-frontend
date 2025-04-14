import {
    BASE_URL_ORGANIZATIONS,
    organizationsApiSlice,
} from '@app/api/common/organizationsApiSlice';

import { organizations_dto } from '@dto/organizations.dto';

type OrganizationResponse = {
    success: boolean;
    result?: organizations_dto | string;
    error?: string;
};

const organizationApiSlice = organizationsApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrganization: builder.mutation<OrganizationResponse, Omit<organizations_dto, 'id'>>({
            query: (data) => ({
                url: `${BASE_URL_ORGANIZATIONS}create_org/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Organizations'],
        }),
        changeOrganizationInfo: builder.mutation<OrganizationResponse, organizations_dto>({
            query: (data: organizations_dto) => ({
                url: `${BASE_URL_ORGANIZATIONS + data.id}/update_org/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Organizations'],
        }),
        deleteOrganizations: builder.mutation<OrganizationResponse, string>({
            query: (id: string) => ({
                url: `${BASE_URL_ORGANIZATIONS + id}/delete_org/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Organizations'],
        }),
    }),
});

export const {
    useCreateOrganizationMutation,
    useChangeOrganizationInfoMutation,
    useDeleteOrganizationsMutation,
} = organizationApiSlice;
