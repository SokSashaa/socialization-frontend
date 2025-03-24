import { FC, ReactNode, useRef } from 'react';
import { toast } from 'react-toastify';
import styles from '../Profile/Profile.module.css';
import { Container, ErrorMessage } from '../../../../UI';
import { Formik } from 'formik';
import { profileSchema } from '../../utils/validation.helper';
import { uploadedFileSchema } from '../../../../utils/helpers';
import ProfileInfoForm from '../ProfileInfoForm/ProfileInfoForm';
import { useChangeUserInfoMutation } from '../../api/profileApiSlice';
import Spinner from '../../../../UI/spinners/Spinner';
import { useUploadPhoto } from '../../../../hooks';
import { user_dto } from '../../../../dto/user.dto';
import { INPUT_FIELDS } from './config/inputFields';
import { initialValuesType } from './types';
import { useLocation } from 'react-router-dom';
import RoleSelect from "../../../../components/RoleSelect/RoleSelect";
import OrganizationsSelect from "../../../../components/OrganizationsSelect/OrganizationsSelect";
import css from './WrapperProfileInfo.module.scss'

interface WrapperProfileInfoProps {
    user: user_dto;
    initialValues: initialValuesType;
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
    open: () => void;
    children?: ReactNode;
    onSubmit?: (res:any) => void;
}

const WrapperProfileInfo: FC<WrapperProfileInfoProps> = ({
    children,
    isError,
    isFetching,
    isLoading,
    initialValues,
    onSubmit: onSubmitProps,
    user,
    open,
}) => {
    const location = useLocation();
    const fileRef = useRef(null);

    const [changeUserInfo] = useChangeUserInfoMutation();

    const { preview, onUpload } = useUploadPhoto('photo');

    const isUserPage = location.pathname.includes('/users/');

    if (isLoading || isFetching) {
        return (
            <Spinner
                typeSpinner={'big'}
                className="mt-10"
            />
        );
    }

    if (isError) {
        return (
            <ErrorMessage
                message="Ошибка загрузки профиля"
                className="mt-10"
            />
        );
    }

    const onSubmit = async (values) => {
        const newInfo = {
            ...values,
            photo: values.photo.indexOf('data:image') === -1 ? null : values.photo,
        };

        try {
            const res = await changeUserInfo({ id: user?.id, data: newInfo }).unwrap();

            if (!res.success) {
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
                                inputFields={INPUT_FIELDS}
                            >
                                {isUserPage && (
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
