type FindFirstErrorWithPathReturnType = {
    path: string;
    message: string;
};

export const findFirstErrorWithPath = (
    obj,
    currentPath: string = '',
): FindFirstErrorWithPathReturnType | null => {
    if (typeof obj === 'string') {
        // Нашли строку с ошибкой → возвращаем
        return { path: currentPath, message: obj };
    }

    if (Array.isArray(obj)) {
        // Ищем в массиве (проверяем элементы по порядку)
        for (let i = 0; i < obj.length; i++) {
            const result = findFirstErrorWithPath(obj[i], `${currentPath}[${i}]`);
            if (result) {
                return result;
            }
        }
    } else if (obj && typeof obj === 'object') {
        // Ищем в объекте (проверяем все ключи)
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const newPath = currentPath ? `${currentPath}.${key}` : key;
                const result = findFirstErrorWithPath(obj[key], newPath);
                if (result) {
                    return result;
                }
            }
        }
    }

    // Ничего не нашли
    return null;
};
