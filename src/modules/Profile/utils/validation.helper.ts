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
		.matches(/^(?:\+7|7)[0-9]{10}$/, 'Некорректный формат номера. (+7/7)XXXXXXXXXX'),
	address: Yup.string().when('role.code', {
		is: 'observed',
		then: (schema) => schema.required('Обязательное поле'),
		otherwise: (schema) => schema.notRequired(),
	}),
	birthday: Yup.date()
		.required('Обязательное поле')
		.max(new Date(), 'Некорректная дата')
		.min(new Date(1920, 0, 1), 'Дата не может быть раньше 1 января 1920 года'),
});

export const changePasswordSchema = Yup.object({
	old_password: Yup.string().trim().required('Обязательное поле'),
	new_password: Yup.string()
		.trim()
		.matches(/^(?=.*\d)(?=.*[a-zA-Z]).+$/, 'Должен содержать хотя бы одну букву и цифру')
		.required('Обязательное поле'),
});

export const changePasswordSchemaAdmin = Yup.object({
	new_password: Yup.string().trim().required('Обязательное поле'),
});
