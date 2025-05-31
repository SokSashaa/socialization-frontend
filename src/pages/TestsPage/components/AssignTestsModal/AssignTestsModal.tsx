import {FC, useEffect, useState} from 'react';
import React from 'react';
import {toast} from 'react-toastify';
import {useAssignTestMutation} from '@app/api/common/testApiSlice';
import {useLazyGetObservedsConditionalQuery} from '@app/api/common/usersApiSlice';

import {SearchBar} from '@components/index';

import {Button, Checkbox, ErrorMessage, Modal, ModalLayout} from '@UI/index';
import Spinner from '@UI/spinners/Spinner';

import {useAppSelector} from '@hooks/redux';

import {ROLES} from '@utils/constants';

import styles from './AssignTestsModal.module.scss';

type AssignTestsModalProps = {
	showModal: boolean;
	selectedTest: number | null;
	setShowModal: (value: 'assign' | 'create' | null) => void;
};

export const AssignTestsModal: FC<AssignTestsModalProps> = ({
	selectedTest,
	showModal,
	setShowModal,
}) => {
	const currentUser = useAppSelector((state) => state.auth?.user);
	const role = currentUser?.role;
	const id = currentUser?.id;
	const isAdmin = role === ROLES.administrator.code;

	const handleCloseModal = () => {
		setShowModal(null);
		setSelectedUsers([]);
	};

	const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

	const [
		getObserveds,
		{
			isLoading: isUsersLoading,
			isFetching: isUsersFetching,
			isError: isUsersError,
			data: users,
		},
	] = useLazyGetObservedsConditionalQuery();

	const [assignTest, {isLoading: isAssigning}] = useAssignTestMutation();

	useEffect(() => {
		const onObservedsRequest = async () => {
			try {
				const observeds = await getObserveds({
					text: '',
					isAdmin: isAdmin,
					id: id,
				}).unwrap();

				const selected = observeds.results
					.filter((user) => {
						if (!user.tests || !selectedTest) {
							return false;
						}

						return user.tests.includes(selectedTest);
					})
					.map((item) => item.id);

				setSelectedUsers(selected);
			} catch (error) {
				console.error('Failed to fetch observeds:', error);
			}
		};

		if (showModal) {
			onObservedsRequest();
		}
	}, [showModal, selectedTest]);

	const onSearch = (query: string) => {
		if (showModal) {
			getObserveds({
				text: query.trim(),
				isAdmin: isAdmin,
				id: id,
			});
		}
	};

	const onSelectUser = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {value, checked} = event.target;

		if (!Number(value)) {
			return;
		}

		const newValue = Number(value);

		if (checked) {
			setSelectedUsers((prev) => [...prev, newValue]);
		} else {
			setSelectedUsers((prev) => prev.filter((id) => id !== newValue));
		}
	};

	const handleAssign = async () => {
		try {
			if (!selectedTest || !users) {
				throw new Error();
			}

			const unlinkUsers = users.results
				.filter((u) => !selectedUsers.includes(u.id))
				.map((u) => u.id);

			await assignTest({
				test_id: selectedTest,
				link: selectedUsers,
				unlink: unlinkUsers,
			}).unwrap();

			toast.success('Тест успешно назначен');
			handleCloseModal();
		} catch (error) {
			toast.error(error?.data?.detail || 'Что-то пошло не так');
		}
	};

	return selectedTest === null ? null : (
		<Modal active={showModal} handleClose={handleCloseModal}>
			<ModalLayout
				title={'Назначить/снять тест у  наблюдаемых'}
				content={
					<div className="text-center">
						<SearchBar className={styles.search} onSearch={onSearch} />
						{isUsersLoading ||
							(isUsersFetching && <Spinner className={styles.spinner} />)}
						{isUsersError && (
							<ErrorMessage
								message="Ошибка загрузки пользователей"
								className={styles.error}
							/>
						)}
						{!isUsersLoading && !isUsersFetching && !isUsersError && users && (
							<ul className={styles.list}>
								{users.results.map((user) => {
									const isAssigned =
										selectedUsers.find((item) => item === user.id) !==
										undefined;

									return (
										<li className={styles.item} key={user.id}>
											<Checkbox
												label={`${user.second_name ?? 'фамилия'} ${user.name ?? 'имя'} ${user.patronymic ?? ''}`}
												labelAlign={'left'}
												labelClassName={styles.label}
												checkboxProps={{
													value: user.id,
													defaultChecked: isAssigned,
													onChange: onSelectUser,
												}}
											/>
										</li>
									);
								})}
							</ul>
						)}
						<Button disabled={isAssigning} onClick={handleAssign}>
							{isAssigning ? <Spinner /> : 'Назначить'}
						</Button>
					</div>
				}
			/>
		</Modal>
	);
};
