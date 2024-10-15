import { apiSlice } from '../../../app/api/apiSlice';

const testApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTests: builder.query({
      query: (params) => {
        const { search, sort } = params;
        return {
          url: '/tests/',
          params: {
            search,
            ordering: sort,
          },
        };
      },
      providesTags: ['Tests'],
      transformResponse: (response) => response.results,
    }),
    deleteTest: builder.mutation({
      query: (id) => ({
        url: `/tests/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tests'],
    }),
    addTest: builder.mutation({
      query: (test) => ({
        url: '/tests/create_test/',
        method: 'POST',
        body: test,
      }),
      transformResponse: (response) => response.result.id,
      invalidatesTags: ['Tests'],
    }),
    assignTest: builder.mutation({
      query: (data) => ({
        url: '/tests/appoint_test/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Observeds', 'ObservedTests'],
    }),
  }),
});

export const {
  useGetTestsQuery,
  useDeleteTestMutation,
  useAddTestMutation,
  useAssignTestMutation,
} = testApiSlice;
