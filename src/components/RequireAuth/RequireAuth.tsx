import {FC} from 'react';
import {useSelector} from 'react-redux';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useLocalStorage} from '@rehooks/local-storage';

import {LocalStorageUser} from '@src/types';

import {selectCurrentUser} from '@modules/Auth';
import React from 'react';

/**
 * Маршрутизаиця пользователя в зависимости от роли и авторизации
 */
type RequireAuth = {
	allowedRoles: string[] | 'all';
	redirectPath?: string;
};

const RequireAuth: FC<RequireAuth> = ({allowedRoles, redirectPath = '/auth'}) => {
	const location = useLocation();
	const [auth] = useLocalStorage<LocalStorageUser | null>('auth', null);
	const user = useSelector(selectCurrentUser) || auth?.user || null; // TODO: Подумать нужно ли здесь использование localStorage

	const allowedRoutes =
		allowedRoles === 'all' || allowedRoles.includes(user?.role) ? (
			<Outlet />
		) : (
			<Navigate replace to="/unauthorized" state={{from: location}} />
		);

	return user ? allowedRoutes : <Navigate replace to={redirectPath} state={{from: location}} />;
};

export default RequireAuth;
