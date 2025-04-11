import { user_dto } from '@dto/user.dto';

export enum ListTypeEnum {
    TESTS = 'tests',
    GAMES = 'games',
}

export interface ComponentListProps {
    currentUser: user_dto;
    listType: ListTypeEnum;
}
