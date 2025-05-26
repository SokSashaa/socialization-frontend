import { paginationRequest, paginationResponse } from '@dto/pagination.dto';
import { user_dto } from '@dto/users/user.dto';

export type sortListValuesType = 'id' | 'name' | '-name' | 'organization' | '-organization';

export const sortList: {label: string, value: sortListValuesType}[] = [
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

export type getUsersRequest = {
    search: string;
    ordering: sortListValuesType;
} & paginationRequest

export type getUsersResponse = {
    results: user_dto[]
} & paginationResponse
