import {object, string} from 'yup';

export const createTestValidate = object({
	title: string().trim().required('Обязательное поле'),
	description: string().notRequired(),
});
