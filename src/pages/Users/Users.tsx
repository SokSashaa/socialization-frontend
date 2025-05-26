import React, {useEffect, useState} from 'react';
import {useGetUsersQuery} from '@app/api/common/usersApiSlice';

import {sortList, sortListValuesType} from '@dto/users/getUsers.dto';
import {user_dto} from '@dto/users/user.dto';

import {FilteredList, Portal} from '@components/index';
import {ButtonAddItemList, Container, Modal, ModalLayout} from '@UI/index';
import NewUserForm from '@modules/UsersList/components/NewUserForm/NewUserForm';
import UserItem from '@modules/UsersList/components/UserItem/UserItem';

import styles from './UsersList.module.scss';
import {useSearchParams} from 'react-router-dom';

const DEFAULT_PAGINATION_LIMIT = 10;

const Users = () => {
	const [showModal, setShowModal] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

	const [count, setCount] = useState(0);

	const pagination = {
		offset: Number(searchParams.get('offset')) || 0,
		limit: Number(searchParams.get('limit')) || DEFAULT_PAGINATION_LIMIT,
		count: count,
	};

	const {data, isLoading, isFetching, isError} = useGetUsersQuery({
		search: searchParams.get('search') || '',
		ordering: (searchParams.get('ordering') as sortListValuesType) || 'id',
		limit: pagination.limit,
		offset: pagination.offset,
	});

	useEffect(() => {
		if (data && data.count !== count) {
			setCount(data.count);
		}
	}, [data]);

	const onSearch = (query: string) => {
		setSearchParams((prev) => {
			const value = query.trim();
			const params = new URLSearchParams(prev);

			if (value) {
				params.set('search', value);
			} else {
				params.delete('search');
			}

			return params;
		});
	};

	const onShowModal = () => {
		setShowModal(true);
	};

	const handleOnChange = () => {
		setShowModal((prevShowModal) => !prevShowModal);
	};

	const onSort = (value: sortListValuesType) => {
		setSearchParams((prev) => {
			const params = new URLSearchParams(prev);

			if (value) {
				params.set('ordering', value);
			} else {
				params.delete('ordering');
			}

			return params;
		});
	};

	return (
		<div className={styles.wrapper}>
			<Container>
				<FilteredList<user_dto>
					items={data ? data.results : []}
					isError={isError}
					sortList={sortList}
					isLoading={isLoading || isFetching}
					renderListItem={(user: user_dto) => <UserItem user={user} />}
					onSearch={onSearch}
					onSort={onSort}
					pagination={pagination}
				>
					<ButtonAddItemList onClick={onShowModal}>
						Добавить пользователя
					</ButtonAddItemList>
				</FilteredList>
			</Container>
			<Portal>
				<Modal active={showModal} setActive={handleOnChange}>
					<ModalLayout title="Добавить пользователя" content={<NewUserForm />} />
				</Modal>
			</Portal>
		</div>
	);
};

export default Users;
