import {answers_dto} from './answers.dto';

export type questions_dto = {
	type: string;
	title: string;
	required: boolean;
	id: string;
	answers: answers_dto[];
};
