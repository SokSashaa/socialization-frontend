import {assignTestRequestDto, assignTestResponseDto} from '@dto/testsDtos/assignTest.dto';
import {getObserverTestsRequest} from '@dto/testsDtos/getObserverTests.dto';
import {getTestsRequest, getTestsResponse} from '@dto/testsDtos/getTests.dto';
import {Test_dto} from '@dto/testsDtos/test.dto';

import {apiSlice} from '../apiSlice';

type TestResponseType = {
	success: boolean;
	result: Test_dto;
};

const testApiSlice = apiSlice.injectEndpoints?.({
	endpoints: (builder) => ({
		getTest: builder.query<Test_dto, string>({
			query: (id) => `/tests/${id}/get_single_test/`,
			keepUnusedDataFor: 0.1,
			transformResponse: (response: TestResponseType) => response.result,
		}),
		getObserverTests: builder.query<getTestsResponse, getObserverTestsRequest>({
			query: (params) => ({
				url: '/tests/get_user_tests/',
				params: params,
			}),
			providesTags: ['ObservedTests'],
		}),
		getTests: builder.query<getTestsResponse, getTestsRequest>({
			query: (params) => {
				return {
					url: '/tests/',
					params,
				};
			},
			providesTags: ['Tests'],
		}),
		deleteTest: builder.mutation({
			query: (id: number) => ({
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
		assignTest: builder.mutation<assignTestResponseDto, assignTestRequestDto>({
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
	useGetTestQuery,
	useGetObserverTestsQuery,
	useGetTestsQuery,
	useDeleteTestMutation,
	useAddTestMutation,
	useAssignTestMutation,
} = testApiSlice;
