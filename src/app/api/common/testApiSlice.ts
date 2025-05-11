import { Test_dto } from '@dto/test.dto';

import { apiSlice } from '../apiSlice';

type TestResponseType = {
    success: boolean;
    result: Test_dto;
};

type UserTestResponse = {
    success: boolean;
    result: {
        tests: Test_dto[];
        user_id: string;
    };
};

const testApiSlice = apiSlice.injectEndpoints?.({
    endpoints: (builder) => ({
        getTest: builder.query<Test_dto, string>({
            query: (id) => `/tests/${id}/get_single_test/`,
            keepUnusedDataFor: 0.1,
            transformResponse: (response: TestResponseType) => response.result,
        }),
        getObserverTests: builder.query<Test_dto[], any>({
            query: (params) => {
                const { id } = params;

                return {
                    url: '/tests/get_user_tests/',
                    params: {
                        user_id: id,
                    },
                };
            },
            transformResponse: (response: UserTestResponse) => response.result.tests,
            providesTags: ['ObservedTests'],
        }),
    }),
});

export const { useGetTestQuery, useGetObserverTestsQuery } = testApiSlice;
