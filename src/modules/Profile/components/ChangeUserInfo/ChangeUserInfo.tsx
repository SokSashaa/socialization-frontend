import React, {FC} from 'react';
import {useParams} from 'react-router-dom';
import {useGetSingleUserQuery} from '@app/api/common/usersApiSlice';

import {Portal} from '@components/index';

import {useModalState} from '@hooks/useModalState';

import ChangePasswordModal from '../ChangePasswordModal/ChangePasswordModal';
import WrapperProfileInfo from '../WrapperProfileInfo/WrapperProfileInfo';

const ChangeUserInfo: FC = () => {
	const {id} = useParams();

	const {data: user, isFetching, isLoading, isError} = useGetSingleUserQuery(id!);

	const [isOpen, open, close] = useModalState(false);

	return (
		<>
			{user && (
				<WrapperProfileInfo
					user={user}
					isLoading={isLoading}
					isFetching={isFetching}
					isError={isError}
					open={open}
				/>
			)}
			<Portal>
				<ChangePasswordModal admin showModal={isOpen} setShowModal={close} />
			</Portal>
		</>
	);
};
export default ChangeUserInfo;
