import { organizations_dto } from './organizations.dto';
import { RoleCode } from '../utils/constants';

export type user_dto = {
    id: string;
    email: string;
    name: string;
    second_name: string;
    organization?: organizations_dto;
    birthday?: Date | null | string;
    photo?: null | string;
    login?: string;
    patronymic?: string;
    phone_number?: string;
    role?: RoleCode;
};
