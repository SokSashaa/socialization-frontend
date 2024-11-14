import {FC, useRef} from "react";
import {user_dto} from "../../../../dto/user.dto";
import styles from "../Profile/Profile.module.css";
import {Container, ErrorMessage} from "../../../../UI";
import {Formik} from "formik";
import {profileSchema} from "../../utils/validation.helper";
import {uploadedFileSchema} from "../../../../utils/helpers";
import ProfileInfoForm, {InputFieldType} from "../ProfileInfoForm/ProfileInfoForm";
import {useChangeUserInfoMutation} from "../../api/profileApiSlice";
import {useGetSingleUserQuery} from "../../../../app/api/common/usersApiSlice";
import {useUploadPhoto} from "../../../../hooks";
import Spinner from "../../../../UI/spinners/Spinner";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import {useModalState} from "../../../../hooks/useModalState";
import {ROLES} from "../../../../utils/constants";

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
    {
        name: 'role',
        label: 'Роль',
        type: 'select'
    }
];

const ChangeUserInfo: FC = () => {

    const {id} = useParams()

    const fileRef = useRef(null);

    const [changeUserInfo] = useChangeUserInfoMutation();
    const {data: user, isFetching, isLoading, isError} = useGetSingleUserQuery(id);

    const {preview, onUpload} = useUploadPhoto('photo');

    const [isOpen, open, close] = useModalState(false);


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
    const initialValues:Partial<user_dto> = {
        name: user?.name || '',
        patronymic: user?.patronymic || '',
        second_name: user?.second_name || '',
        birthday: user?.birthday || '2022-01-01',
        email: user?.email || '',
        photo: user?.photo || '',
        role: user?.role || ROLES.observed.code
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


            toast.success('Данные профиля обновлены');
        } catch (error) {
            toast.error(error?.data?.detail || error.message || 'Что-то пошло не так');
        }
    };


    return <div className={styles.wrapper}>
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
            </div>
        </Container>
    </div>

}

export default ChangeUserInfo
