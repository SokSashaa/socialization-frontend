import {array, number, object, ObjectSchema, string} from "yup";
import {organizations_dto} from "../../../dto/organizations.dto";

export const organizationsValidate= object({
    name: string().trim().required('Обязательное поле'),
    address:string().trim().required('Обязательное поле'),
    site:string().trim().url('Введите верную ссылку').required('Обязательное поле'),
    phone_number:string().trim().min(11, 'Номер минимум 11 символов').max(12, 'Номер не более 12 символов').required('Обязательное поле'),
    email: string().email().trim().required('Обязательное поле'),
});
