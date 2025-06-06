import {InputFieldType} from '@src/types';

export const INPUT_FIELDS: InputFieldType[] = [
	{
		name: 'name',
		label: 'Имя *',
		type: 'text',
	},
	{
		name: 'second_name',
		label: 'Фамилия *',
		type: 'text',
	},
	{
		name: 'patronymic',
		label: 'Отчество (при наличии)',
		type: 'text',
	},
	{
		name: 'birthday',
		label: 'Дата рождения *',
		type: 'date',
	},
	{
		name: 'email',
		label: 'Email *',
		type: 'email',
	},
	{
		name: 'phone_number',
		label: 'Телефон *',
		type: 'text',
	},
	{
		name: 'login',
		label: 'Логин',
		type: 'text',
		disabled: true,
	},
];
