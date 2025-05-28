import {
	imageTransformResponseArray,
	imageTransformResponseItem,
} from '@app/api/common/utils/transformResponsePhoto';

import {getCategoryRequest, getCategoryResponse} from '@dto/users/getCategory.dto';
import {
	getObservedsByTutorRequest,
	getObservedsByTutorResponse,
	getObservedsByTutorSortListValuesType,
} from '@dto/users/getObservedsByTutor.dto';
import {
	getObservedsConditionalRequest,
	getObservedsConditionalResponse,
} from '@dto/users/getObservedsConditional.dto';
import {getUsersRequest, getUsersResponse} from '@dto/users/getUsers.dto';
import {user_dto} from '@dto/users/user.dto';

import {apiSlice} from '../apiSlice';

import {UserResponse} from './types';

const usersApiSlice = apiSlice.injectEndpoints?.({
	endpoints: (builder) => ({
		getUsers: builder.query<getUsersResponse, getUsersRequest>({
			query: (params) => ({
				url: '/users/',
				params,
			}),
			transformResponse: (res: getUsersResponse) => {
				const results = imageTransformResponseArray<user_dto>(res.results, 'photo');

				return {
					...res,
					results: results,
				};
			},
			providesTags: ['Users'],
		}),
		getObservedsConditional: builder.query<
			getObservedsConditionalResponse,
			getObservedsConditionalRequest
		>({
			query: (params) => {
				if (params.isAdmin) {
					return {
						url: '/users/get_observeds/',
						params: {
							text: params.text,
							offset: params.offset,
							limit: params.limit,
						},
					};
				} else {
					return {
						url: `/users/${params.id}/get_observeds_by_tutor/`,
						params: {
							text: params.text,
							offset: params.offset,
							limit: params.limit,
							ordering: 'name' as getObservedsByTutorSortListValuesType,
						},
					};
				}
			},
			providesTags: ['Observeds', 'ObservedsTutor'],
			transformResponse: (res: getObservedsConditionalResponse) => {
				const results = imageTransformResponseArray<user_dto>(res.results, 'photo');

				return {
					...res,
					results,
				};
			},
		}),
		getObserveds: builder.query<getCategoryResponse, getCategoryRequest>({
			query: (params) => ({
				url: '/users/get_observeds/',
				params,
			}),
			providesTags: ['Observeds'],
			transformResponse: (res: getCategoryResponse): getCategoryResponse => {
				const results = imageTransformResponseArray<user_dto>(res.results, 'photo');

				return {
					...res,
					results,
				};
			},
		}),
		getObservedsByTutor: builder.query<getObservedsByTutorResponse, getObservedsByTutorRequest>(
			{
				query: (params) => {
					const newParams = params.text
						? {
								text: params.text,
								ordering: params.ordering,
								limit: params.limit,
								offset: params.offset,
							}
						: {
								ordering: params.ordering,
								limit: params.limit,
								offset: params.offset,
							};

					return {
						url: `/users/${params.id}/get_observeds_by_tutor/`,
						method: 'GET',
						params: newParams,
					};
				},
				providesTags: ['ObservedsTutor'],
				transformResponse: (res: getObservedsByTutorResponse) => {
					const transformed = imageTransformResponseArray<user_dto>(res.results, 'photo');

					return {
						...res,
						results: transformed,
					};
				},
			}
		),
		getTutors: builder.query<getCategoryResponse, getCategoryRequest>({
			query: (params) => ({
				url: '/users/get_tutors/',
				params,
				method: 'GET',
			}),
			transformResponse: (res: getCategoryResponse): getCategoryResponse => {
				const results = imageTransformResponseArray<user_dto>(res.results, 'photo');

				return {
					...res,
					results,
				};
			},
		}),
		appointObserveds: builder.mutation({
			query: (data) => ({
				url: '/users/appoint_observed/',
				method: 'POST',
				body: data,
			}),
			transformResponse: (res) => res.results,
			invalidatesTags: ['ObservedsTutor', 'Observeds'],
		}),
		getUserInfo: builder.query<user_dto, void>({
			query: () => ({
				url: '/users/me/',
				method: 'GET',
			}),
			transformResponse: (response: UserResponse) =>
				imageTransformResponseItem<user_dto>(response.result, 'photo'),
			providesTags: ['User'],
		}),
		getSingleUser: builder.query<user_dto, number>({
			query: (id) => ({
				url: `/users/${id}/`,
				method: 'GET',
			}),
			transformResponse: (res: user_dto) =>
				imageTransformResponseItem<user_dto>(res, 'photo'),
		}),
		getTutorByObserved: builder.query<user_dto, number>({
			query: (id: number) => ({
				url: `/users/${id}/get_tutor_by_observed/`,
				method: 'GET',
			}),
			transformResponse: (res: UserResponse) =>
				imageTransformResponseItem<user_dto>(res.result, 'photo'),
		}),
	}),
});

export const {
	useGetUsersQuery,
	useLazyGetObservedsConditionalQuery,
	useGetObservedsQuery,
	useLazyGetObservedsQuery,
	useGetObservedsByTutorQuery,
	useGetTutorsQuery,
	useAppointObservedsMutation,
	useGetUserInfoQuery,
	useLazyGetUserInfoQuery,
	useGetSingleUserQuery,
	useGetTutorByObservedQuery,
	useLazyGetTutorByObservedQuery,
} = usersApiSlice;
