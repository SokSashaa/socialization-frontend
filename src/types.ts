import { user_dto } from '@dto/user.dto';

export type LocalStorageUser = {
    user: user_dto;
    access: string;
    refresh: string;
};
