import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocalStorage } from '@rehooks/local-storage';
import { setUserCredentials, logout } from '../../slice/authSlice';
import { useLazyGetUserInfoQuery } from '../../../../app/api/common/usersApiSlice';

/**
 * Получаем инфу о пользователе при первом открытии приложения
 */
const AuthInit = ({ children }) => {
  const dispatch = useDispatch();
  const [auth] = useLocalStorage('auth', null);

  const [getUserInfo, { isLoading, isUninitialized }] = useLazyGetUserInfoQuery();

  const access = auth?.access;

  useEffect(() => {
    const userRequest = async () => {
      try {
        const user = await getUserInfo().unwrap();

        dispatch(setUserCredentials(user));
      } catch (error) {
        dispatch(logout());
      }
    };

    if (access) {
      userRequest();
    } else {
      dispatch(logout());
    }

    // eslint-disable-next-line
  }, []);

  return (isLoading || isUninitialized) && access ? <p>Загрузка...</p> : children;
};

export default AuthInit;
