import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { XCircleIcon } from '@heroicons/react/24/solid';

import { ItemListWrapper } from '@UI/index';

import { Test_dto } from '@dto/test.dto';

import { useAppSelector } from '@hooks/redux';

import { RoleCode, ROLES } from '@utils/constants';
import { convertDate } from '@utils/helpers';

import { useDeleteTestMutation } from '../../api/testApiSlice';
import { setSelectedTest } from '../../slice/testsSlice';

import styles from './TestListItem.module.scss';
import ControlModal from '@components/ControlModal/ControlModal';
import { useModalState } from '@hooks/useModalState';

interface TestListItemProps {
    test: Test_dto;
    toggleModal: () => void;
    userId: string;
}

const TestListItem: FC<TestListItemProps> = ({ test, toggleModal, userId }) => {
    const [deleteTest] = useDeleteTestMutation();
    const user = useAppSelector((state) => state.auth.user);
    const role = user?.role as RoleCode;

    const [isOpen, open, close] = useModalState(false);

    const dispatch = useDispatch();

    const onSelectTest = (id: string) => () => {
        dispatch(setSelectedTest(id));
        toggleModal();
    };

    const onDelete = async (id: string) => {
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
                            onClick={onSelectTest(test.id)}
                        >
                            Назначить
                        </button>
                        <Link
                            className={styles.button}
                            to={`/tests/${test.id}/edit`}
                        >
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
                            onClick={onSelectTest(test.id)}
                        >
                            Назначить
                        </button>
                        <Link
                            className={styles.button}
                            to={`/tests/${test.id}/edit`}
                        >
                            Редактировать
                        </Link>
                    </>
                );
            case ROLES.observed.code:
                return (
                    <Link
                        className={styles.button}
                        to={`/tests/${test.id}/pass`}
                    >
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
                    state={{ userId }}
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
