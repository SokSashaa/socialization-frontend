import {object, string} from 'yup';

export const organizationsValidate = object({
	name: string().trim().required('Обязательное поле'),
	address: string().trim().required('Обязательное поле'),
	site: string().trim().url('Введите верную ссылку').required('Обязательное поле'),
	phone_number: string()
		.trim()
		.matches(/^(?:\+7|7)[0-9]{10}$/, 'Некорректный формат номера. (+7/7)XXXXXXXXXX')
		.required('Обязательное поле'),
	email: string().email('Формат почты неверный').trim().required('Обязательное поле'),
});
