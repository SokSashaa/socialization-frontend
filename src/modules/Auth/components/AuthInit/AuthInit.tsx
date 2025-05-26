import {FC, ReactNode, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useLocalStorage} from '@rehooks/local-storage';
import {logout, setUserCredentials} from '@modules/Auth';
import {useLazyGetUserInfoQuery} from '@app/api/common/usersApiSlice';
import {LocalStorageUser} from '@src/types';

/**
 * Получаем инфу о пользователе при первом открытии приложения
 */

interface AuthInitProps {
	children: ReactNode;
}

const AuthInit: FC<AuthInitProps> = ({children}) => {
	const dispatch = useDispatch();
	const [auth] = useLocalStorage<LocalStorageUser | null>('auth', null);

	const [getUserInfo, {isLoading, isUninitialized}] = useLazyGetUserInfoQuery();

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
	}, []);

	return (isLoading || isUninitialized) && access ? <p>Загрузка...</p> : children;
};

export default AuthInit;
