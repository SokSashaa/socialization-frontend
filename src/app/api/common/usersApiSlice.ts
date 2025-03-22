import {apiSlice} from '../apiSlice';
import {user_dto} from "../../../dto/user.dto";
import {BaseQueryArg} from "@reduxjs/toolkit/dist/query/baseQueryTypes";

const usersApiSlice = apiSlice.injectEndpoints?.({
    endpoints: (builder) => ({
        getUsers: builder.query<Partial<user_dto[]>, any>({
            query: (params) => ({
                url: '/users/',
                params,
            }),
            transformResponse: (res) => res.results,
            providesTags: ['Users'],
        }),
        getObserveds: builder.query({
            query: (params) => ({
                url: '/users/get_observeds/',
                params,
            }),
            providesTags: ['Observeds'],
            transformResponse: (res) => res.results,
        }),
        getObservedsByTutor: builder.query<Partial<user_dto[]>, { id: string | number, text?: string, ordering?: any }>({
            query: (params) => {
                const {id, text, ordering} = params;
                return {
                    url: `/users/${id}/get_observeds_by_tutor/`,
                    method: 'GET',
                    params: {text, ordering},
                };
            },
            providesTags: ['ObservedsTutor'],
            transformResponse: (res) => res.results,
        }),
        getTutors: builder.query({
            query: () => ({
                url: '/users/get_tutors/',
                method: 'GET',
            }),
            transformResponse: (res) => res.results,
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
        getUserInfo: builder.query<Partial<user_dto>, any>({
            query: () => ({
                url: '/users/me/',
                method: 'GET',
            }),
            transformResponse: (response) => response.result,
            providesTags: ['User'],
        }),
        getSingleUser: builder.query<Partial<user_dto>, string>({
            query: (id) => ({
                url: `/users/${id}/`,
                method: 'GET',
            }),
        }),
        getTutorByObserved: builder.query<Partial<user_dto>, string>({
            query:(id: string)=> ({
                url: `/users/${id}/get_tutor_by_observed/`,
                method: 'GET',
            }),
            transformResponse: (res) => res.result,
        })
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
} = usersApiSlice;
