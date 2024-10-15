import { apiSlice } from '../../../app/api/apiSlice';

const passTestApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    passTest: builder.mutation({
      query: (data) => ({
        url: '/tests/send_answers/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ObservedTests'],
    }),
  }),
});

// eslint-disable-next-line
export const { usePassTestMutation } = passTestApiSlice;
