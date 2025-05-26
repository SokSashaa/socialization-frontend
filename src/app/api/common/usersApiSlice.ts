import {
	imageTransformResponseArray,
	imageTransformResponseItem,
} from '@app/api/common/utils/transformResponsePhoto';

import {getUsersRequest, getUsersResponse} from '@dto/users/getUsers.dto';
import {user_dto} from '@dto/users/user.dto';

import {apiSlice} from '../apiSlice';

import {UserArrayResponse, UserResponse} from './types';

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
		getObserveds: builder.query<user_dto[], {text: string}>({
			query: (params) => ({
				url: '/users/get_observeds/',
				params,
			}),
			providesTags: ['Observeds'],
			transformResponse: (res: UserArrayResponse) =>
				imageTransformResponseArray<user_dto>(res.result, 'photo'),
		}),
		getObservedsByTutor: builder.query<
			user_dto[], //TODO: Исправить тип
			{
				id: string | number;
				text?: string;
				ordering?: any;
			}
		>({
			query: (params) => {
				const {id, text, ordering} = params;

				return {
					url: `/users/${id}/get_observeds_by_tutor/`,
					method: 'GET',
					params: {text, ordering},
				};
			},
			providesTags: ['ObservedsTutor'],
			transformResponse: (res: UserArrayResponse) =>
				imageTransformResponseArray<user_dto>(res.result, 'photo'),
		}),
		getTutors: builder.query<user_dto[], void>({
			query: () => ({
				url: '/users/get_tutors/',
				method: 'GET',
			}),
			transformResponse: (res: UserArrayResponse) =>
				imageTransformResponseArray<user_dto>(res.result, 'photo'),
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
		getSingleUser: builder.query<user_dto, string>({
			query: (id) => ({
				url: `/users/${id}/`,
				method: 'GET',
			}),
			transformResponse: (res: user_dto) =>
				imageTransformResponseItem<user_dto>(res, 'photo'),
		}),
		getTutorByObserved: builder.query<user_dto, string>({
			query: (id: string) => ({
				url: `/users/${id}/get_tutor_by_observed/`,
				method: 'GET',
			}),
			transformResponse: (res: UserResponse) =>
				imageTransformResponseItem<user_dto>(res.result, 'photo'),
		}),
	}),
});

export const {
	useLazyGetUsersQuery,
	useGetUsersQuery,
	useLazyGetObservedsQuery,
	useGetObservedsQuery,
	useGetObservedsByTutorQuery,
	useGetTutorsQuery,
	useAppointObservedsMutation,
	useGetUserInfoQuery,
	useLazyGetUserInfoQuery,
	useGetSingleUserQuery,
	useGetTutorByObservedQuery,
	useLazyGetTutorByObservedQuery,
} = usersApiSlice;
