import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const userSchema = Yup.object({
  name: Yup.string()
    .required('Обязательное поле')
    .matches(/^[a-zA-Zа-яА-Я]+(\s+[a-zA-Zа-яА-Я]+)*$/, 'Содержит недопустимые символы')
    .matches(/^\S+$/, 'Содержит недопустимые символы'),

  second_name: Yup.string()
    .required('Обязательное поле')
    .matches(/^[a-zA-Zа-яА-Я-]+(\s+[a-zA-Zа-яА-Я-]+)*$/, 'Содержит недопустимые символы')
    .matches(/^\S+$/, 'Содержит недопустимые символы'),

  patronymic: Yup.string()
    .trim()
    .matches(/^[a-zA-Zа-яА-Я-]+(\s+[a-zA-Zа-яА-Я-]+)*$/, 'Содержит недопустимые символы')
    .matches(/^\S+$/, 'Содержит недопустимые символы'),

  email: Yup.string()
    .required('Обязательное поле')
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Некорректный email'),

  birthday: Yup.date().required('Обязательное поле').max(new Date(), 'Некорректная дата'),

  password: Yup.string()
    .required('Обязательное поле')
    .matches(/^\S+$/, 'Неккорректный пароль')
    .matches(/^(?=.*\d)(?=.*[a-zA-Z]).+$/, 'Должен содержать хотя бы одну букву и цифру')
    .min(8, 'Минимум 8 символов'),
  login: Yup.string().required('Обязательное поле').matches(/^\S+$/, 'Неккорректный логин'),
  role: Yup.object({
    tutor_id: Yup.string().required('Обязательное поле'),
  }),
  organization: Yup.string().required('Обязательное поле')
});

export const userPhotoSchema = Yup.object({
  photo: Yup.mixed().required('Обязательное поле'),
});
