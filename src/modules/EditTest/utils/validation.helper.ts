import { object, string, array, number } from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const testSchema = object({
  title: string().trim().required('Обязательное поле'),
  questions: array().of(
    object({
      title: string().trim().required('Обязательное поле'),
      answers: array().of(
        object({
          text: string().trim().required('Введите ответ'),
          point: number().min(0, 'Минимум  0'),
        }),
      ),
    }),
  ),
});
