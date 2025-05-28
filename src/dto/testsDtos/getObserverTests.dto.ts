import {paginationRequest, paginationResponse} from '@dto/pagination.dto';
import {Test_dto} from '@dto/testsDtos/test.dto';

export type getObserverTestsRequest = {
	user_id: number;
} & paginationRequest;

export type getObserverTestsInitialResponse = {
	result: {
		tests: Test_dto[];
		user_id: string | number;
	};
} & paginationResponse;
