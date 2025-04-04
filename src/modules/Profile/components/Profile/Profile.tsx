import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetUserInfoQuery } from '../../../../app/api/common/usersApiSlice';
import { logout, setUserCredentials } from '../../../Auth';

import { Button } from '../../../../UI';
import { Portal } from '../../../../components';
import ChangePasswordModal from '../ChangePasswordModal/ChangePasswordModal';
import styles from './Profile.module.css';
import { useModalState } from '../../../../hooks/useModalState';
import WrapperProfileInfo from '../WrapperProfileInfo/WrapperProfileInfo';

const Profile = () => {
    const { data: user, isFetching, isLoading, isError } = useGetUserInfoQuery();

    const navigate = useNavigate();

    const [isOpen, open, close] = useModalState(false);

    const dispatch = useDispatch();

    const initialValues = {
        name: user?.name || '',
        patronymic: user?.patronymic || '',
        second_name: user?.second_name || '',
        birthday: user?.birthday || '2022-01-01',
        email: user?.email || '',
        photo: user?.photo || '',
    };

    const onLogout = () => {
        dispatch(logout());
        navigate('/auth');
    };

    return (
        <>
            {user && (
                <WrapperProfileInfo
                    user={user}
                    initialValues={initialValues}
                    isLoading={isLoading}
                    isFetching={isFetching}
                    isError={isError}
                    open={open}
                    onSubmit={(res) => dispatch(setUserCredentials(res.result))}
                >
                    <div className={styles.logoutButtonContainer}>
                        <Button
                            className={styles.logoutButton}
                            onClick={onLogout}
                        >
                            Выйти
                        </Button>
                    </div>
                </WrapperProfileInfo>
            )}
            <Portal>
                <ChangePasswordModal
                    showModal={isOpen}
                    setShowModal={close}
                />
            </Portal>
        </>
    );
};

export default Profile;
