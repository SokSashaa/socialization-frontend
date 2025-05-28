import * as Yup from 'yup';

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
        .matches(/^\S+$/, 'Некорректный пароль')
        .matches(/^(?=.*\d)(?=.*[a-zA-Z]).+$/, 'Должен содержать хотя бы одну букву и цифру')
        .min(8, 'Минимум 8 символов'),
    login: Yup.string().required('Обязательное поле').matches(/^\S+$/, 'Неккорректный логин'),
    role: Yup.object().shape({
        code: Yup.string().notRequired(),
        tutor_id: Yup.string().when('code', {
            is: 'observed',
            then: (schema) => schema.required('Обязательное поле'), //TODO разобраться
            otherwise: (schema) => schema.notRequired(),
        }),
    }),
    organization: Yup.string().required('Обязательное поле'),
    phone_number: Yup.string()
        .required('Обязательное поле')
        .matches(/^\+?[1-9][0-9]{7,14}$/, 'Некорректный формат номера. +7XXXXXXXXXX'),
    address: Yup.string().when('role.code', {
        is: 'observed',
        then: (schema) => schema.required('Обязательное поле'),
        otherwise: (schema) => schema.notRequired(),
    }),
});

export const userPhotoSchema = Yup.object({
    photo: Yup.mixed(),
    // .required('Обязательное поле'),
});
