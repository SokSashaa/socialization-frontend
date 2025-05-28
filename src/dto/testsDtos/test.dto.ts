import {questions_dto} from './questions.dto';

export type Base_Test_Dto = {
	id: number;
	title: string;
	description: string;
	created_at: Date;
};

export type Test_dto = Base_Test_Dto & {
	questions?: questions_dto[];
	is_passed?: boolean;
};
