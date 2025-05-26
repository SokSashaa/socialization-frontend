import {organizations_dto} from '@dto/organizations/organizations.dto';
import {paginationRequest, paginationResponse} from '@dto/pagination.dto';

export type sortListOrganizationValuesType = 'id' | 'name' | '-name';

export type getOrganizationsRequest = {
	search: string;
	ordering: sortListOrganizationValuesType;
} & paginationRequest;

export type getOrganizationsResponse = {
	results: organizations_dto[];
} & paginationResponse;

export const sortListOrganizations: {label: string; value: sortListOrganizationValuesType}[] = [
	{
		label: 'По умолчанию',
		value: 'id',
	},
	{
		label: 'По имени (А-Я)',
		value: 'name',
	},
	{
		label: 'По имени (Я-А)',
		value: '-name',
	},
];
