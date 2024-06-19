import { apiSlice } from '../apiSlice';

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
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
      query: (id) => ({
        url: `/users/${id}/get_observeds_by_tutor/`,
        method: 'GET',
      }),
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
    getUserInfo: builder.query({
      query: () => ({
        url: '/users/me/',
        method: 'GET',
      }),
      transformResponse: (response) => response.result,
      providesTags: ['User'],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/users/${id}/`,
        method: 'GET',
      }),
    }),
  }),
});

// eslint-disable-next-line
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
} = usersApiSlice;
