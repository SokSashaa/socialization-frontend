import { user_dto } from '../../../dto/user.dto';

export type UserResponseDefault = {
    count: number;
    next: any;
    previous: any;
    results: user_dto[];
};

export type UserResponseArray = {
    success: boolean;
    result: user_dto[];
};

export type UserResponse = {
    success: boolean;
    result: user_dto;
};
