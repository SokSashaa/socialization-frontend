import { apiSlice } from '../apiSlice';

const testApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTest: builder.query({
      query: (id) => `/tests/${id}/get_single_test/`,
      keepUnusedDataFor: 0.1,
      transformResponse: (response) => response.result,
    }),
    getObserverTests: builder.query({
      query: (params) => {
        const { id } = params;
        return {
          url: '/tests/get_user_tests/',
          params: {
            user_id: id,
          },
        };
      },
      transformResponse: (response) => response.result.tests,
      providesTags: ['ObservedTests'],
    }),
  }),
});

// eslint-disable-next-line
export const { useGetTestQuery, useGetObserverTestsQuery } = testApiSlice;
