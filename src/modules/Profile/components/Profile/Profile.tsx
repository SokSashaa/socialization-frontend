import {useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {Formik} from 'formik';
import {useUploadPhoto} from '../../../../hooks';
import {useChangeUserInfoMutation} from '../../api/profileApiSlice';
import {useGetUserInfoQuery} from '../../../../app/api/common/usersApiSlice';
import {logout, setUserCredentials} from '../../../Auth';

import {Button, Container, ErrorMessage} from '../../../../UI';
import {Portal} from '../../../../components';
import ChangePasswordModal from '../ChangePasswordModal/ChangePasswordModal';
import ProfileInfoForm, {InputFieldType} from '../ProfileInfoForm/ProfileInfoForm';

import {profileSchema} from '../../utils/validation.helper';
import {uploadedFileSchema} from '../../../../utils/helpers';
import styles from './Profile.module.css';
import Spinner from "../../../../UI/spinners/Spinner";
import {useModalState} from "../../../../hooks/useModalState";

const inputFields: InputFieldType[] = [
    {
        name: 'name',
        label: 'Имя *',
        type: 'text',
    },
    {
        name: 'second_name',
        label: 'Фамилия *',
        type: 'text',
    },
    {
        name: 'patronymic',
        label: 'Отчество (при наличии)',
        type: 'text',
    },
    {
        name: 'birthday',
        label: 'Дата рождения *',
        type: 'date',
    },
    {
        name: 'email',
        label: 'Email *',
        type: 'email',
    },
];

const Profile = () => {
    const fileRef = useRef(null);

    const [changeUserInfo] = useChangeUserInfoMutation();
    const {data: user, isFetching, isLoading, isError} = useGetUserInfoQuery();

    const navigate = useNavigate();

    const {preview, onUpload} = useUploadPhoto('photo');

    const [isOpen, open, close] = useModalState(false);

    const dispatch = useDispatch();

    if (isLoading || isFetching) {
        return <Spinner typeSpinner={'big'} className="mt-10"/>;
    }

    if (isError) {
        return (
            <ErrorMessage
                message="Ошибка загрузки профиля"
                className="mt-10"
            />
        );
    }
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

    const onSubmit = async (values) => {
        const newInfo = {
            ...values,
            photo: values.photo.indexOf('data:image') === -1 ? null : values.photo,
        };

        try {
            const res = await changeUserInfo({id: user.id, data: newInfo}).unwrap();

            if (!res.success) {
                throw new Error(res.errors[0]);
            }
            dispatch(setUserCredentials(res.result));

            toast.success('Данные профиля обновлены');
        } catch (error) {
            toast.error(error?.data?.detail || error.message || 'Что-то пошло не так');
        }
    };

    return (
        <>
            <div className={styles.wrapper}>
                <Container>
                    <div className={styles.inner}>
                        <Formik
                            onSubmit={onSubmit}
                            initialValues={initialValues}
                            validationSchema={profileSchema.concat(uploadedFileSchema(fileRef))}
                        >
                            {(formikProps) => (
                                <ProfileInfoForm
                                    user={user}
                                    formikProps={formikProps}
                                    preview={preview}
                                    onUpload={onUpload}
                                    onShowModal={open}
                                    fileRef={fileRef}
                                    inputFields={inputFields}/>
                            )}
                        </Formik>
                        <div className={styles.bottom}>
                            <div className={styles.logoutButtonContainer}>
                                <Button
                                    className={styles.logoutButton}
                                    onClick={onLogout}
                                >
                                    Выйти
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
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
