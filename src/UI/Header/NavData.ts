import {ROUTES} from '@routes/RouterConfig';

type linkType = {
	title: string;
	path: string;
};
type linksType = {[key: string]: linkType[]};

export const links: linksType = {
	administrator: [
		{
			title: 'Главная',
			path: ROUTES.home,
		},
		{
			title: 'Пользователи',
			path: ROUTES.users,
		},
		{
			title: 'Игры',
			path: ROUTES.games,
		},
		{
			title: 'Тесты',
			path: ROUTES.tests,
		},
		{
			title: 'Организации',
			path: ROUTES.organization,
		},
		{
			title: 'Мои наблюдаемые',
			path: ROUTES.myObservers,
		},
	],
	tutor: [
		{
			title: 'Главная',
			path: ROUTES.home,
		},
		{
			title: 'Мои наблюдаемые',
			path: ROUTES.myObservers,
		},
		{
			title: 'Игры',
			path: ROUTES.games,
		},
		{
			title: 'Тесты',
			path: ROUTES.tests,
		},
	],
	observed: [
		{
			title: 'Главная',
			path: ROUTES.home,
		},
		{
			title: 'Игры',
			path: ROUTES.games,
		},
		{
			title: 'Тесты',
			path: ROUTES.tests,
		},
	],
	unroled: [
		{
			title: 'Главная',
			path: ROUTES.home,
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
