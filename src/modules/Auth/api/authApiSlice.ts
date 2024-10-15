import { apiSlice } from '../../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/obtain_token/',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
