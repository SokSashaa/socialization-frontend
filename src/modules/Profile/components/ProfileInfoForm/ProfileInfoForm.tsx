import { FC, MutableRefObject, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, FormikProps } from 'formik';

import TestResultUser from '@modules/Profile/components/TestResultUser/TestResultUser';
import { ChangePropOrganizationInUserType } from '@modules/Profile/components/types';

import { Button, InputText, UploadFile } from '@UI/index';
import Spinner from '@UI/spinners/Spinner';

import { user_dto } from '@dto/user.dto';

import { useAppSelector } from '@hooks/redux';

import { ROLES } from '@utils/constants';

import { userIconV2Big } from '@assets/index';

import AppointedTutor from '../AppointedTutor/AppointedTutor';
import ObservedList from '../ObservedList/ObservedList';

import css from './ProfileInfo.module.scss';
import styles from './ProfileInfoForm.module.css';

export type InputFieldType = {
    type: 'email' | 'date' | 'text' | 'select';
    name: string;
    label: string;
};

interface ProfileInfoFormPropsType {
    formikProps: FormikProps<ChangePropOrganizationInUserType>;
    preview: string | null;
    onUpload: any;
    onShowModal: () => void;
    fileRef: MutableRefObject<null>;
    user: user_dto;
    inputFields: InputFieldType[];
    children?: ReactNode;
}

const ProfileInfoForm: FC<ProfileInfoFormPropsType> = ({
    formikProps,
    preview,
    onUpload,
    onShowModal,
    fileRef,
    user,
    inputFields,
    children,
}) => {
    const { values } = formikProps;

    const location = useLocation();

    const authUser = useAppSelector((state) => state.auth.user);

    const isUserPage = location.pathname.includes('/users/');

    const submitBtnContent = formikProps.isSubmitting ? <Spinner /> : 'Сохранить';

    const isShowObservedInfo = isUserPage && authUser?.role === ROLES.administrator.code;

    const isShowTestResult = isUserPage && user.role === ROLES.observed.code;

    return (
        <Form
            method="post"
            className={styles.form}
        >
            <div className={styles.left}>
                {preview || user?.photo ? (
                    <div className={styles.avatarWrapper}>
                        <div className={styles.avatarContainer}>
                            <img
                                className={styles.avatar}
                                src={preview || user?.photo || ''}
                                alt="avatar"
                            />
                        </div>
                    </div>
                ) : (
                    <img
                        className={styles.defaultAvatar}
                        src={userIconV2Big}
                        alt="avatar"
                    />
                )}

                <div className={styles.leftButtonsContainer}>
                    <UploadFile
                        fileRef={fileRef}
                        label="Изменить фото"
                        className={styles.upload}
                        inputProps={{
                            name: 'photo',
                            accept: 'image/png, image/jpeg, image/jpg',
                        }}
                        onChange={onUpload(formikProps)}
                    />
                    {user.role !== ROLES.administrator.code && (
                        <Button
                            className={styles.changePaswordButton}
                            type={'button'}
                            onClick={onShowModal}
                        >
                            Сменить пароль
                        </Button>
                    )}
                </div>
            </div>
            <div className={styles.right}>
                {inputFields.map(({ name, label, type }) => {
                    if (type === 'date' && user.role !== ROLES.observed.code) {
                        return null;
                    }

                    return (
                        <InputText
                            key={name}
                            wrapperClassNames={styles.input}
                            label={label}
                            name={name}
                            type={type}
                        />
                    );
                })}
                {values.role?.code === ROLES.observed.code && (
                    <InputText
                        name={'address'}
                        label={'Адрес'}
                        type={'text'}
                        wrapperClassNames={styles.input}
                    />
                )}
                {children && <div className={css.container}>{children}</div>}

                <div className={styles.saveButtonWrapper}>
                    <Button
                        type="submit"
                        disabled={formikProps.isSubmitting || !formikProps.isValid}
                    >
                        {submitBtnContent}
                    </Button>
                </div>
                {isShowObservedInfo && (
                    <>
                        {user.role !== ROLES.observed.code && <ObservedList user_id={user.id} />}
                        {user.role === ROLES.observed.code && <AppointedTutor user_id={user.id} />}
                    </>
                )}
                {isShowTestResult && (
                    <TestResultUser
                        label={'Назначенные тесты'}
                        user_id={user.id}
                    />
                )}
            </div>
        </Form>
    );
};

export default ProfileInfoForm;
