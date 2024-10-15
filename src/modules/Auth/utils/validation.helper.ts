import { object, string } from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const authSchema = object({
  login: string().trim().required('Обязательное поле'),
  password: string().trim().required('Обязательное поле'),
});
