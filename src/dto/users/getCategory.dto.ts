import {paginationRequest, paginationResponse} from '@dto/pagination.dto';
import {user_dto} from '@dto/users/user.dto';

export type getCategoryRequest = {
	text: string;
} & paginationRequest;

export type getCategoryResponse = {
	results: user_dto[];
} & paginationResponse;
