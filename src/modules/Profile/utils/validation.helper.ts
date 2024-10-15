import * as Yup from 'yup';

export const profileSchema = Yup.object({
  name: Yup.string()
    .required('Обязательное поле')
    .matches(/^[a-zA-Zа-яА-Я]+(\s+[a-zA-Zа-яА-Я]+)*$/, 'Содержит недопустимые символы')
    .matches(/^\S+$/, 'Содержит недопустимые символы'),
  second_name: Yup.string()
    .required('Обязательное поле')
    .matches(/^[a-zA-Zа-яА-Я-]+(\s+[a-zA-Zа-яА-Я-]+)*$/, 'Содержит недопустимые символы')
    .matches(/^\S+$/, 'Содержит недопустимые символы'),
  email: Yup.string()
    .required('Обязательное поле')
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Некорректный email'),
  patronymic: Yup.string()
    .trim()
    .matches(/^[a-zA-Zа-яА-Я-]+(\s+[a-zA-Zа-яА-Я-]+)*$/, 'Содержит недопустимые символы')
    .matches(/^\S+$/, 'Содержит недопустимые символы'),
});

export const changePasswordSchema = Yup.object({
  old_password: Yup.string().trim().required('Обязательное поле'),
  new_password: Yup.string().trim().required('Обязательное поле'),
});
