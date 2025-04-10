import {InputFieldType} from '@modules/Profile/components/ProfileInfoForm/ProfileInfoForm';

export const inputFieldsOrganizations: InputFieldType[] = [
    {
        name: 'name',
        label: 'Название ',
        type: 'text',
    },
    {
        name: 'address',
        label: 'Адрес ',
        type: 'text',
    },
    {
        name: 'phone_number',
        label: 'Телефон',
        type: 'text',
    },
    {
        name: 'email',
        label: 'Почта',
        type: 'email',
    },
    {
        name: 'site',
        label: 'Сайт',
        type: 'text',
    },
];
