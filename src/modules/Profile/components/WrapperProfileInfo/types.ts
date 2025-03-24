import { user_dto } from '../../../../dto/user.dto';

export type initialValuesType = Omit<user_dto, 'role' | 'id'> & {
    role?: {
        code: string;
        tutor_id: string;
    };
};
