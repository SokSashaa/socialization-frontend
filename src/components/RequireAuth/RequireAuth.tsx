import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocalStorage } from '@rehooks/local-storage';
import { selectCurrentUser } from '../../modules/Auth';

/**
 * Маршрутизаиця пользователя в зависимости от роли и авторизации
 */
const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const [auth] = useLocalStorage('auth', null);
  const user = useSelector(selectCurrentUser) || auth?.user || null;

  const allowedRoutes = allowedRoles.includes(user?.role) ? (
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
      to="/auth"
      state={{ from: location }}
      replace
    />
  );
};

export default RequireAuth;
