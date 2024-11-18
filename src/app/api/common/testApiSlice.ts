import { apiSlice } from '../apiSlice';
import {test_dto} from "../../../dto/test.dto";

type TestResponseType = {
  success:boolean,
  result: test_dto
}

const testApiSlice = apiSlice.injectEndpoints?.({
  endpoints: (builder) => ({
    getTest: builder.query<test_dto, string>({
      query: (id) => `/tests/${id}/get_single_test/`,
      keepUnusedDataFor: 0.1,
      transformResponse: (response:TestResponseType) =>  response.result,
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

export const { useGetTestQuery, useGetObserverTestsQuery } = testApiSlice;
