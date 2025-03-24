import {InputFieldType} from "../../ProfileInfoForm/ProfileInfoForm";

export const INPUT_FIELDS: InputFieldType[] = [
    {
        name: 'name',
        label: 'Имя *',
        type: 'text',
    },
    {
        name: 'second_name',
        label: 'Фамилия *',
        type: 'text',
    },
    {
        name: 'patronymic',
        label: 'Отчество (при наличии)',
        type: 'text',
    },
    {
        name: 'birthday',
        label: 'Дата рождения *',
        type: 'date',
    },
    {
        name: 'email',
        label: 'Email *',
        type: 'email',
    },
];
