import {paginationRequest, paginationResponse} from '@dto/pagination.dto';
import {user_dto} from '@dto/users/user.dto';

export type getObservedsConditionalRequest = {
	isAdmin: boolean;
	id?: number;
	text: string;
} & paginationRequest;

export type getObservedsConditionalResponse = {
	results: user_dto[];
} & paginationResponse;
