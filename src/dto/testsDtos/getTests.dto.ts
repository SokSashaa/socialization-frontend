import {paginationRequest, paginationResponse} from '@dto/pagination.dto';
import {Test_dto} from '@dto/testsDtos/test.dto';

export type sortListValuesType = 'id' | 'title' | '-created_at';

export const testSortList = [
	{
		label: 'По умолчанию',
		value: 'id',
	},
	{
		label: 'По имени (А-Я)',
		value: 'title',
	},
	{
		label: 'По дате',
		value: 'created_at',
	},
];

export type getTestsRequest = {
	search: string;
	ordering: sortListValuesType;
} & paginationRequest;

export type getTestsResponse = {
	results: Test_dto[];
} & paginationResponse;
