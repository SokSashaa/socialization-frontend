import {paginationRequest, paginationResponse} from '@dto/pagination.dto';
import {user_dto} from '@dto/users/user.dto';

export type getObservedsByTutorSortListValuesType = 'id' | 'name';

export const sortList: {label: string; value: getObservedsByTutorSortListValuesType}[] = [
	{
		label: 'По умолчанию',
		value: 'id',
	},
	{
		label: 'По имени (А-Я)',
		value: 'name',
	},
];

export type getObservedsByTutorRequest = {
	id: number;
	text?: string;
	ordering: getObservedsByTutorSortListValuesType;
} & paginationRequest;

export type getObservedsByTutorResponse = {
	success: boolean;
	results: user_dto[];
} & paginationResponse;
