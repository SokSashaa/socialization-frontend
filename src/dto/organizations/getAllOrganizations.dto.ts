import {paginationRequest, paginationResponse} from '@dto/pagination.dto';
import {organizations_dto} from '@dto/organizations/organizations.dto';

export type getOrganizationsRequest = {
	search: string;
} & paginationRequest;

export type getOrganizationsResponse = {
	results: organizations_dto[];
} & paginationResponse;
