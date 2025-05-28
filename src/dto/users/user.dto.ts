import {RoleCode} from '@utils/constants';

import {organizations_dto} from '../organizations/organizations.dto';

export type user_dto = {
	id: number;
	login?: string;
	email: string;
	name: string;
	second_name: string;
	patronymic?: string;
	role?: RoleCode;
	photo?: null | string;
	birthday?: Date | null | string;
	phone_number?: string;
	organization?: organizations_dto;
	address?: string;
	tests?: number[];
	games?: number[];
};
