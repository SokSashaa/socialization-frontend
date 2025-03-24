import { apiSlice } from '../apiSlice';
import { user_dto } from '../../../dto/user.dto';
import {UserResponse, UserResponseArray, UserResponseDefault} from "./types";


const usersApiSlice = apiSlice.injectEndpoints?.({
    endpoints: (builder) => ({
        getUsers: builder.query<user_dto[], void>({
            query: (params) => ({
                url: '/users/',
                params,
            }),
            transformResponse: (res: UserResponseDefault) => res.results,
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
            transformResponse: (res) => res.result,
        }),
        getTutors: builder.query<user_dto[], void>({
            query: () => ({
                url: '/users/get_tutors/',
                method: 'GET',
            }),
            transformResponse: (res: UserResponseArray) => res.result,
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
            transformResponse: (response: UserResponse) => response.result,
            providesTags: ['User'],
        }),
        getSingleUser: builder.query<user_dto, string>({
            query: (id) => ({
                url: `/users/${id}/`,
                method: 'GET',
            }),
        }),
        getTutorByObserved: builder.query<user_dto, string>({
            query: (id: string) => ({
                url: `/users/${id}/get_tutor_by_observed/`,
                method: 'GET',
            }),
            transformResponse: (res: UserResponse) => res.result,
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
} = usersApiSlice;
