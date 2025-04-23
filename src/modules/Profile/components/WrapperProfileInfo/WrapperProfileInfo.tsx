import { FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Formik, FormikProps } from 'formik';
import { useLazyGetTutorByObservedQuery } from '@app/api/common/usersApiSlice';

import OrganizationsSelect from '@modules/Organizations/components/OrganizationsSelect/OrganizationsSelect';
import RoleSelect from '@modules/Profile/components/RoleSelect/RoleSelect';
import { OnSubmitFormType, UserWithRoleCodeType } from '@modules/Profile/components/types';

import { Container, ErrorMessage } from '@UI/index';
import Spinner from '@UI/spinners/Spinner';

import { user_dto } from '@dto/user.dto';

import { useUploadPhoto } from '@hooks/index';
import { useAppSelector } from '@hooks/redux';

import { ROLES } from '@utils/constants';
import { uploadedFileSchema } from '@utils/helpers';

import { useChangeUserInfoMutation } from '../../api/profileApiSlice';
import { profileSchema } from '../../utils/validation.helper';
import ProfileInfoForm from '../ProfileInfoForm/ProfileInfoForm';

import { INPUT_FIELDS } from './config/inputFields';

import styles from '../Profile/Profile.module.css';
import css from './WrapperProfileInfo.module.scss';

interface WrapperProfileInfoProps {
    user: user_dto;
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
    open: () => void;
    children?: ReactNode;
    onSubmit?: (res: OnSubmitFormType) => void;
}

const WrapperProfileInfo: FC<WrapperProfileInfoProps> = ({
    children,
    isError,
    isFetching,
    isLoading,
    onSubmit: onSubmitProps,
    user,
    open,
}) => {
    const fileRef = useRef(null);

    const [initialValues, setInitialValues] = useState<UserWithRoleCodeType>();

    const [changeUserInfo] = useChangeUserInfoMutation();
    const [getTutor] = useLazyGetTutorByObservedQuery();

    const { preview, onUpload } = useUploadPhoto('photo');

    const currentUser = useAppSelector((state) => state.auth?.user);

    const getTutorID = useMemo(async () => {
        if (user?.role !== ROLES.observed.code) {
            return '';
        }

        const { data: tutor, isError } = await getTutor(user?.id);

        if (isError) {
            return '';
        }

        if (tutor) {
            return tutor.id;
        }

        return '';
    }, [getTutor, user?.id, user?.role]);

    const getInitialValuesForm = useMemo(async (): Promise<UserWithRoleCodeType> => {
        return {
            name: user?.name || '',
            patronymic: user?.patronymic || '',
            second_name: user?.second_name || '',
            birthday: user?.birthday || '2022-01-01',
            email: user?.email || '',
            photo: user?.photo || '',
            role: {
                code: user?.role || ROLES.observed.code,
                tutor_id: await getTutorID,
            },
            organization: user?.organization,
            address: user?.address,
            phone_number: user?.phone_number || '',
        };
    }, [getTutorID, user]);

    useEffect(() => {
        if (user) {
            getInitialValuesForm.then((value) => {
                setInitialValues(value);
            });
        }
    }, [user]);

    if (!user || !initialValues) {
        return null;
    }

    if (isLoading || isFetching) {
        return <Spinner style={{ margin: '15px auto' }} />;
    }

    if (isError) {
        return (
            <ErrorMessage
                message="Ошибка загрузки профиля"
                className="mt-10"
            />
        );
    }

    const onSubmit = async (values: UserWithRoleCodeType) => {
        const newInfo = {
            ...values,
            photo: values.photo && values.photo.indexOf('data:image') === -1 ? null : values.photo,
        };

        try {
            const res: OnSubmitFormType = await changeUserInfo({
                id: user?.id,
                data: newInfo,
            }).unwrap();

            if (!res.success && res.errors) {
                throw new Error(res.errors[0]);
            }
            if (onSubmitProps) {
                onSubmitProps(res);
            }

            toast.success('Данные профиля обновлены');
        } catch (error) {
            toast.error(
                error?.data?.detail || error.message || error?.data?.error || 'Что-то пошло не так',
            );
        }
    };

    return (
        <div className={styles.wrapper}>
            <Container>
                <div className={styles.inner}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={profileSchema.concat(uploadedFileSchema(fileRef))}
                        onSubmit={onSubmit}
                    >
                        {(formikProps: FormikProps<UserWithRoleCodeType>) => (
                            <ProfileInfoForm
                                user={user}
                                formikProps={formikProps}
                                preview={preview}
                                fileRef={fileRef}
                                inputFields={INPUT_FIELDS}
                                onUpload={onUpload}
                                onShowModal={open}
                            >
                                {currentUser?.role === ROLES.administrator.code && (
                                    <>
                                        <RoleSelect
                                            formikProps={formikProps}
                                            classNameError={css.selectError}
                                        />
                                        <OrganizationsSelect formikProps={formikProps} />
                                    </>
                                )}
                            </ProfileInfoForm>
                        )}
                    </Formik>
                    <div className={styles.bottom}>{children}</div>
                </div>
            </Container>
        </div>
    );
};

export default WrapperProfileInfo;
