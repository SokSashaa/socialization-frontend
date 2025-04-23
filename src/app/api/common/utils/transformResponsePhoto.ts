import { user_dto } from '@dto/user.dto';

const API_URL = import.meta.env.VITE_ROOT_URL;

const transformResponsePhoto = (photo: string) => {
    return API_URL + photo;
};

export const transformResponseUserArray = (users: user_dto[]): user_dto[] => {
    return users.map((user) => ({
        ...user,
        photo: user.photo ? transformResponsePhoto(user.photo) : undefined,
    }));
};

export const transformResponseUser = (user: user_dto) => {
    if (user.photo) {
        return { ...user, photo: transformResponsePhoto(user.photo) };
    }

    return user;
};
