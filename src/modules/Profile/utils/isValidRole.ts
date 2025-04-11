import { ROLES } from '@utils/constants';

export const isValidRole = (role: string): role is keyof typeof ROLES => {
    return role in ROLES;
};
