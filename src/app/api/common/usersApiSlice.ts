import { apiSlice } from '../apiSlice';
import {user_dto} from "../../../dto/user.dto";

const usersApiSlice = apiSlice.injectEndpoints?.({
  endpoints: (builder) => ({
    getUsers: builder.query<Partial<user_dto[]>>({
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
    getObservedsByTutor: builder.query({
      query: (params) => {
        const { id, text, ordering } = params;
        return {
          url: `/users/${id}/get_observeds_by_tutor/`,
          method: 'GET',
          params: { text, ordering },
        };
      },
      providesTags: ['ObservedsTutor'],
      transformResponse: (res) => res.results,
    }),
    getTutors: builder.query({
      query: (params) => ({
        url: '/users/get_tutors/',
        params,
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
    getUserInfo: builder.query<Partial<user_dto>>({
      query: () => ({
        url: '/users/me/',
        method: 'GET',
      }),
      transformResponse: (response) => response.result,
      providesTags: ['User'],
    }),
    getSingleUser: builder.query<Partial<user_dto,string>>({
      query: (id) => ({
        url: `/users/${id}/`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLazyGetUsersQuery,
  useGetUsersQuery,
  useLazyGetObservedsQuery,
  useGetObservedsQuery,
  useGetUserInfoQuery,
  useLazyGetUserInfoQuery,
  useLazyGetTutorsQuery,
  useGetObservedsByTutorQuery,
  useGetSingleUserQuery,
  useAppointObservedsMutation,
} = usersApiSlice;
