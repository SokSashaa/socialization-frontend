import { user_dto } from '@dto/user.dto';

export type ChangePropOnStringType<T, OldKey extends keyof T> = Omit<T, OldKey> & {
    [K in OldKey]: string | undefined;
};

export type UserWithRoleCodeType = Omit<user_dto, 'role' | 'id'> & {
    role: {
        code: string;
        tutor_id: string;
    };
};

export type OnSubmitFormType = {
    success: boolean;
    errors?: string[];
    result?: user_dto;
};

export type ChangePropOrganizationInUserType = ChangePropOnStringType<
    UserWithRoleCodeType,
    'organization'
>;
