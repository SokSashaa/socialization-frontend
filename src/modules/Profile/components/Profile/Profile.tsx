import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useGetUserInfoQuery, useLogoutMutation} from '@app/api/common/usersApiSlice';

import {logout, setUserCredentials} from '@modules/Auth';
import {OnSubmitFormType} from '@modules/Profile/components/types';

import {Portal} from '@components/index';

import {Button} from '@UI/index';

import {useModalState} from '@hooks/useModalState';

import {ROUTES} from '@routes/RouterConfig';

import {clearAllCookies} from '@utils/helpers/clearCookie';

import ChangePasswordModal from '../ChangePasswordModal/ChangePasswordModal';
import WrapperProfileInfo from '../WrapperProfileInfo/WrapperProfileInfo';

import styles from './Profile.module.css';

const Profile = () => {
	const {data: user, isFetching, isLoading, isError} = useGetUserInfoQuery();
	const [logoutServer] = useLogoutMutation();

	const navigate = useNavigate();

	const [isOpen, open, close] = useModalState(false);

	const dispatch = useDispatch();

	const onLogout = async () => {
		await logoutServer();
		clearAllCookies();
		dispatch(logout());
		navigate(ROUTES.auth);
	};

	const onSubmit = useCallback(
		(res: OnSubmitFormType) => {
			if (res.result) {
				dispatch(setUserCredentials(res.result));
			}
		},
		[dispatch]
	);

	return (
		<>
			{user && (
				<WrapperProfileInfo
					user={user}
					isError={isError}
					isLoading={isLoading}
					isFetching={isFetching}
					open={open}
					onSubmit={onSubmit}
				>
					<div className={styles.logoutButtonContainer}>
						<Button className={styles.logoutButton} onClick={onLogout}>
							Выйти
						</Button>
					</div>
				</WrapperProfileInfo>
			)}
			<Portal>
				<ChangePasswordModal showModal={isOpen} setShowModal={close} />
			</Portal>
		</>
	);
};

export default Profile;
