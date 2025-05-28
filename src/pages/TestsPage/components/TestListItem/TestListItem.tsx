import {FC} from 'react';
import React from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useDeleteTestMutation} from '@app/api/common/testApiSlice';
import {XCircleIcon} from '@heroicons/react/24/solid';

import ControlModal from '@components/ControlModal/ControlModal';

import {ItemListWrapper} from '@UI/index';

import {Test_dto} from '@dto/testsDtos/test.dto';

import {useAppSelector} from '@hooks/redux';
import {useModalState} from '@hooks/useModalState';

import {RoleCode, ROLES} from '@utils/constants';
import {convertDate} from '@utils/helpers';

import styles from './TestListItem.module.scss';

interface TestListItemProps {
	test: Test_dto;
	openAssignModal: () => void;
	setSelectedTest: (id: number) => void;
}

const TestListItem: FC<TestListItemProps> = ({test, openAssignModal, setSelectedTest}) => {
	const [deleteTest] = useDeleteTestMutation();
	const user = useAppSelector((state) => state.auth.user);
	const role = user?.role as RoleCode;

	const [isOpen, open, close] = useModalState(false);

	const onSelectTest = (id: number) => {
		setSelectedTest(id);
		openAssignModal();
	};

	const onDelete = async (id: number) => {
		const toastId = toast.loading('Удаление теста...');

		try {
			await deleteTest(id).unwrap();

			toast.update(toastId, {
				render: 'Тест удален',
				type: 'success',
				isLoading: false,
				autoClose: 2000,
			});
		} catch (error) {
			if (role === ROLES.administrator.code) {
				console.warn(error);
			}
			toast.update(toastId, {
				render: 'Произошла ошибка при удалении теста',
				type: 'error',
				isLoading: false,
				autoClose: 2000,
			});
		}
	};

	const renderTestButtons = (userRole: RoleCode) => {
		switch (userRole) {
			case ROLES.administrator.code:
				return (
					<>
						<button
							className={styles.button}
							type="button"
							onClick={() => onSelectTest(test.id)}
						>
							Назначить
						</button>
						<Link className={styles.button} to={`/tests/${test.id}/edit`}>
							Редактировать
						</Link>
						<button
							className={styles.close}
							type="button"
							aria-label="Удалить тест"
							onClick={open}
						>
							<XCircleIcon className={styles.icon} />
						</button>
					</>
				);
			case ROLES.tutor.code:
				return (
					<>
						<button
							className={styles.button}
							type="button"
							onClick={() => onSelectTest(test.id)}
						>
							Назначить
						</button>
						<Link className={styles.button} to={`/tests/${test.id}/edit`}>
							Редактировать
						</Link>
					</>
				);
			case ROLES.observed.code:
				return (
					<Link className={styles.button} to={`/tests/${test.id}/pass`}>
						Пройти
					</Link>
				);
			default:
				return null;
		}
	};

	return (
		<ItemListWrapper>
			<div className={styles.info}>
				<h3
					className={styles.title}
				>{`${test.title} (${convertDate(test.created_at)})`}</h3>
				<p className={styles.description}>{test.description}</p>
			</div>
			{test.is_passed ? (
				<Link
					className={styles.button}
					to={`/tests/${test.id}/result`}
					state={{userId: user?.id}}
				>
					Посмотреть результат
				</Link>
			) : (
				<div className={styles.buttons}>{renderTestButtons(role)}</div>
			)}
			<ControlModal
				isOpen={isOpen}
				setIsOpen={close}
				onClickNo={close}
				onClickYes={() => onDelete(test.id)}
			>
				<p className={styles.childrenModal}>
					Вы уверены, что хотите удалить тест <span>{test.title}?</span>
				</p>
			</ControlModal>
		</ItemListWrapper>
	);
};

export default TestListItem;
