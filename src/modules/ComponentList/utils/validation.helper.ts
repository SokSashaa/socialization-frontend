import { object, string } from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const newTestSchema = object({
  title: string()
    .trim()
    .required('Обязательное поле')
    .matches(/^[a-zA-Zа-яА-Я0-9:,.\s]*$/, 'Только буквы и цифры'),
});
