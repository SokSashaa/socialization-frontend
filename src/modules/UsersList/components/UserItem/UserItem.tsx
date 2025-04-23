import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { XCircleIcon } from '@heroicons/react/24/solid';

import { selectCurrentUser } from '@modules/Auth';
import { isValidRole } from '@modules/Profile/utils/isValidRole';

import ControlModal from '@components/ControlModal/ControlModal';

import { ItemListWrapper } from '@UI/index';

import { user_dto } from '@dto/user.dto';

import { useIsToggled } from '@hooks/useIsToggled';

import { ROLES } from '@utils/constants';
import { toInitial } from '@utils/helpers';

import { userIconV2 } from '@assets/index';

import { useDeleteUserMutation } from '../../api/usersApiSlice';

import styles from './UserItem.module.scss';
import IconList from '@UI/IconList/IconList';

interface UserItemProps {
    user: user_dto;
}

const NOT_FOUND_ROLE = 'Неизвестная роль';

const UserItem: FC<UserItemProps> = ({ user }) => {
    const { id, name, role, photo, patronymic, second_name } = user;

    const {
        isToggled: isOpenModal,
        toggle: setIsOpenModal,
        toggleOn: openModal,
        toggleOff: closeModal,
    } = useIsToggled(false);

    const currentRole = role && isValidRole(role) ? ROLES[role].label : NOT_FOUND_ROLE;

    const fullName = `${second_name} ${toInitial(name)} ${toInitial(patronymic)}`;

    const [deleteUser] = useDeleteUserMutation();

    const { id: currentUserId } = useSelector(selectCurrentUser);

    const onDelete = async (userId: string) => {
        const toastId = toast.loading('Удаление пользователя...');

        try {
            await deleteUser(userId).unwrap();

            toast.update(toastId, {
                render: 'Пользователь удален',
                type: 'success',
                isLoading: false,
                autoClose: 2000,
            });
        } catch (error) {
            toast.update(toastId, {
                render: 'Произошла ошибка при удалении пользователя',
                type: 'error',
                isLoading: false,
                autoClose: 2000,
            });
        }
    };

    return (
        <ItemListWrapper>
            <div className={styles.info}>
                <IconList
                    id={id}
                    photo={photo}
                    defaultPhoto={userIconV2}
                />
                <div className={styles.text}>
                    <p className={styles.name}>{fullName}</p>
                    <p className={styles.role}>{currentRole}</p>
                </div>
            </div>
            <div className={styles.buttons}>
                {id !== currentUserId && (
                    <>
                        <Link
                            to={`/users/${id}/`}
                            className={styles.button}
                        >
                            Информация
                        </Link>
                        <button
                            className={styles.delete}
                            type="button"
                            aria-label="Удалить пользователя"
                            onClick={() => openModal()}
                        >
                            <XCircleIcon className={styles.icon} />
                        </button>
                    </>
                )}
                <ControlModal
                    isOpen={isOpenModal}
                    setIsOpen={() => setIsOpenModal()}
                    onClickNo={() => closeModal()}
                    onClickYes={() => onDelete(id)}
                >
                    <p className={styles.childrenModal}>
                        Вы уверены, что хотите удалить пользователя
                        <span> {fullName}</span>, у которого роль
                        <span> {currentRole}</span>?
                    </p>
                </ControlModal>
            </div>
        </ItemListWrapper>
    );
};

export default UserItem;
