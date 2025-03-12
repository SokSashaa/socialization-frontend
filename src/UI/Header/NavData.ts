type linkType = {
    title: string,
    path: string,
}
type linksType = {[key: string]: linkType[]};

export const links: linksType = {
    administrator: [
        {
            title: 'Главная',
            path: '/',
        },
        {
            title: 'Пользователи',
            path: '/users',
        },
        {
            title: 'Игры',
            path: '/games',
        },
        {
            title: 'Тесты',
            path: '/tests',
        },
        {
            title: 'Организации',
            path: '/organizations'
        },
        {
            title: 'Мои наблюдаемые',
            path: '/my-observers',
        },
    ],
    tutor: [
        {
            title: 'Главная',
            path: '/',
        },
        {
            title: 'Мои наблюдаемые',
            path: '/my-observers',
        },
        {
            title: 'Игры',
            path: '/games',
        },
        {
            title: 'Тесты',
            path: '/tests',
        },
    ],
    observed: [
        {
            title: 'Главная',
            path: '/',
        },
        {
            title: 'Игры',
            path: '/games',
        },
        {
            title: 'Тесты',
            path: '/tests',
        },
    ],
};

export const mobileLinks = [
    {
        title: 'Личный кабинет',
        path: '/profile',
    },
    {
        title: 'Выход',
        path: '/auth',
    },
];
