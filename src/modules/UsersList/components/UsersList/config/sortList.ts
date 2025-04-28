import { OptionHTMLAttributes } from 'react';

export const sortList: OptionHTMLAttributes<HTMLOptionElement>[] = [
    {
        label: 'По умолчанию',
        value: 'id',
    },
    {
        label: 'По имени (А-Я)',
        value: 'name',
    },
    {
        label: 'По имени (Я-А)',
        value: '-name',
    },
    {
        label: 'По организации (от ранее созданных)',
        value: 'organization',
    },
    {
        label: 'По организации (от позже созданных)',
        value: '-organization',
    },
];
