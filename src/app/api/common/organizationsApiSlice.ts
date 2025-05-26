import {apiSlice} from '../apiSlice';
import {
	getOrganizationsRequest,
	getOrganizationsResponse,
} from '@dto/organizations/getAllOrganizations.dto';
import {organizations_dto} from '@dto/organizations/organizations.dto';

export const BASE_URL_ORGANIZATIONS = '/organizations/';

type OrganizationResponse = {
	success: boolean;
	result?: organizations_dto | string;
	error?: string;
};

export const organizationsApiSlice = apiSlice.injectEndpoints?.({
	endpoints: (builder) => ({
		getAllOrganizations: builder.query<getOrganizationsResponse, getOrganizationsRequest>({
			query: (params) => ({
				url: `${BASE_URL_ORGANIZATIONS}`,
				params,
				method: 'GET',
			}),
			providesTags: ['Organizations'],
		}),
		getOrganizationInfo: builder.query({
			query: (id: string) => ({
				url: `${BASE_URL_ORGANIZATIONS + id}/`,
				method: 'GET',
			}),
		}),

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
	useGetAllOrganizationsQuery,
	useGetOrganizationInfoQuery,

	useCreateOrganizationMutation,
	useChangeOrganizationInfoMutation,
	useDeleteOrganizationsMutation,
} = organizationsApiSlice;
