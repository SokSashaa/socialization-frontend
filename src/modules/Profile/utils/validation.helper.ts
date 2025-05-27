import * as Yup from 'yup';

export const profileSchema = Yup.object({
	name: Yup.string()
		.required('Обязательное поле')
		.trim()
		.matches(/^[a-zA-Zа-яА-Я-]+(\s+[a-zA-Zа-яА-Я-]+)*$/, 'Содержит недопустимые символы'),
	second_name: Yup.string()
		.required('Обязательное поле')
		.trim()
		.matches(/^[a-zA-Zа-яА-Я-]+(\s+[a-zA-Zа-яА-Я-]+)*$/, 'Содержит недопустимые символы'),
	email: Yup.string()
		.required('Обязательное поле')
		.matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Некорректный email'),
	patronymic: Yup.string()
		.trim()
		.matches(/^[a-zA-Zа-яА-Я-]+(\s+[a-zA-Zа-яА-Я-]+)*$/, 'Содержит недопустимые символы'),
	role: Yup.object().shape({
		code: Yup.string().notRequired(),
		tutor_id: Yup.string().when('code', {
			is: 'observed',
			then: (schema) => schema.required('Обязательное поле'), //TODO разобраться
			otherwise: (schema) => schema.notRequired(),
		}),
	}),
	phone_number: Yup.string()
		.required('Обязательное поле')
		.matches(/^\+?[0-9]{11}$/, 'Некорректный формат номера. +7XXXXXXXXXX'),
	address: Yup.string().when('role.code', {
		is: 'observed',
		then: (schema) => schema.required('Обязательное поле'),
		otherwise: (schema) => schema.notRequired(),
	}),
});

export const changePasswordSchema = Yup.object({
	old_password: Yup.string().trim().required('Обязательное поле'),
	new_password: Yup.string().trim().required('Обязательное поле'),
});

export const changePasswordSchemaAdmin = Yup.object({
	new_password: Yup.string().trim().required('Обязательное поле'),
});
