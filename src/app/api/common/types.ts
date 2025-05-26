import { user_dto } from '@dto/users/user.dto';

export type BaseResponseType<T> = {
    count: number;
    next: any;
    previous: any;
    results: T[];
};

export type UserArrayResponse = {
    success: boolean;
    result: user_dto[];
};

export type UserResponse = {
    success: boolean;
    result: user_dto;
};
