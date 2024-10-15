import { apiSlice } from '../../../app/api/apiSlice';

const resultTestApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResultTest: builder.query({
      query: (body) => ({
        url: '/tests/get_answers/',
        method: 'POST',
        body,
      }),
      transformResponse: (response) => response.result,
    }),
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const { useGetResultTestQuery } = resultTestApiSlice;
