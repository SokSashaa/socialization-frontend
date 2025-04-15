import { object, string } from 'yup';

export const organizationsValidate = object({
    name: string().trim().required('Обязательное поле'),
    address: string().trim().required('Обязательное поле'),
    site: string().trim().url('Введите верную ссылку').required('Обязательное поле'),
    phone_number: string()
        .trim()
        .min(11, 'Номер минимум 11 символов')
        .max(12, 'Номер не более 12 символов')
        .required('Обязательное поле'),
    email: string().email('Формат почты неверный').trim().required('Обязательное поле'),
});
