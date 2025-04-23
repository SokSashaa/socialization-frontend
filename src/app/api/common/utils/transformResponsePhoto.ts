const API_URL = import.meta.env.VITE_ROOT_URL;

const transformResponsePhoto = (photo: string) => {
    return API_URL + photo;
};

export const imageTransformResponseArray = <T>(array: T[], field: keyof T): T[] => {
    return array.map((item) => ({
        ...item,
        [field]:
            item[field] && typeof item[field] === 'string'
                ? transformResponsePhoto(item[field])
                : undefined,
    }));
};

export const imageTransformResponseItem = <T>(item: T, field: keyof T): T => {
    if (item[field] && typeof item[field] === 'string') {
        return { ...item, [field]: transformResponsePhoto(item[field]) };
    }

    return item;
};
