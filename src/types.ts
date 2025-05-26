import {user_dto} from '@dto/users/user.dto';

export type LocalStorageUser = {
	user: user_dto;
	access: string;
	refresh: string;
};

export type InputFieldType = {
	type: 'email' | 'date' | 'text' | 'select';
	name: string;
	label: string;
	disabled?: boolean;
};
