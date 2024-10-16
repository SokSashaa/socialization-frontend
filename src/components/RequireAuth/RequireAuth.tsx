import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocalStorage } from '@rehooks/local-storage';
import { selectCurrentUser } from '../../modules/Auth';
import {FC} from "react";

/**
 * Маршрутизаиця пользователя в зависимости от роли и авторизации
 */
type RequireAuth = {
  allowedRoles: string[] | 'all',
  redirectPath?: string
}

const RequireAuth:FC<RequireAuth> = ({ allowedRoles, redirectPath='/auth' }) => {
  const location = useLocation();
  const [auth] = useLocalStorage('auth', null);
  const user = useSelector(selectCurrentUser) || auth?.user || null; // TODO: Подумать нужно ли здесь использование localStorage

  const allowedRoutes =  allowedRoles==='all' || allowedRoles.includes(user?.role) ? (
    <Outlet />
  ) : (
    <Navigate
      to="/unauthorized"
      state={{ from: location }}
      replace
    />
  );

  return user ? (
    allowedRoutes
  ) : (
    <Navigate
      to={redirectPath}
      state={{ from: location }}
      replace
    />
  );
};

export default RequireAuth;
