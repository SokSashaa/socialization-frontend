import {
    transformResponseUser,
    transformResponseUserArray,
} from '@app/api/common/utils/transformResponsePhoto';

import { user_dto } from '@dto/user.dto';

import { apiSlice } from '../apiSlice';

import { UserResponse, UserArrayResponse, UserResponseDefault } from './types';

const usersApiSlice = apiSlice.injectEndpoints?.({
    endpoints: (builder) => ({
        getUsers: builder.query<user_dto[], void>({
            query: (params) => ({
                url: '/users/',
                params,
            }),
            transformResponse: (res: UserResponseDefault) =>
                transformResponseUserArray(res.results),
            providesTags: ['Users'],
        }),
        getObserveds: builder.query<user_dto[], { text: string }>({
            query: (params) => ({
                url: '/users/get_observeds/',
                params,
            }),
            providesTags: ['Observeds'],
            transformResponse: (res: UserArrayResponse) => transformResponseUserArray(res.result),
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
                const { id, text, ordering } = params;

                return {
                    url: `/users/${id}/get_observeds_by_tutor/`,
                    method: 'GET',
                    params: { text, ordering },
                };
            },
            providesTags: ['ObservedsTutor'],
            transformResponse: (res: UserArrayResponse) => transformResponseUserArray(res.result),
        }),
        getTutors: builder.query<user_dto[], void>({
            query: () => ({
                url: '/users/get_tutors/',
                method: 'GET',
            }),
            transformResponse: (res: UserArrayResponse) => transformResponseUserArray(res.result),
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
            transformResponse: (response: UserResponse) => transformResponseUser(response.result),
            providesTags: ['User'],
        }),
        getSingleUser: builder.query<user_dto, string>({
            query: (id) => ({
                url: `/users/${id}/`,
                method: 'GET',
            }),
            transformResponse: (res: user_dto) => transformResponseUser(res),
        }),
        getTutorByObserved: builder.query<user_dto, string>({
            query: (id: string) => ({
                url: `/users/${id}/get_tutor_by_observed/`,
                method: 'GET',
            }),
            transformResponse: (res: UserResponse) => transformResponseUser(res.result),
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
