import { user_dto } from '@dto/users/user.dto';

export type LocalStorageUser = {
    user: user_dto;
    access: string;
    refresh: string;
};
