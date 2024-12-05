import {FC, useState} from 'react';
import {Formik} from 'formik';
import {toast} from 'react-toastify';
import {useChangePasswordAdminMutation, useChangePasswordMutation} from '../../api/profileApiSlice';
import {Modal, ModalLayout} from '../../../../UI';
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm';
import {changePasswordSchema, changePasswordSchemaAdmin} from '../../utils/validation.helper';
import {useParams} from "react-router-dom";

type ChangePasswordModalProps = {
    showModal: boolean,
    setShowModal: (value: boolean) => void,
    admin?: boolean
}
const ChangePasswordModal: FC<ChangePasswordModalProps> = ({showModal, setShowModal, admin}) => {

    const {id} = useParams()

    const [showPassword, setShowPassword] = useState({
        old_password: false,
        new_password: false,
    });
    const [changePassword] = !admin ? useChangePasswordMutation() : useChangePasswordAdminMutation();

    const initialState = {
        old_password: '',
        new_password: '',
    };

    const onShowPassword = (name) => () => {
        setShowPassword((prev) => ({...prev, [name]: !prev[name]}));
    };

    const onSubmit = async (values, {resetForm}) => {
        try {
            let res;
            if (admin) {
                res = await changePassword({id, data: values})
            } else {
                res = await changePassword(values).unwrap();
            }


            if (!res.success) {
                throw new Error(res.errors[0]);
            }

            toast.success('Пароль изменен');
        } catch (error) {
            toast.error(error?.data?.detail || error.message || 'Что-то пошло не так');
        } finally {
            resetForm({values: initialState});
        }
    };

    console.log(admin)

    return (
        <Formik
            initialValues={initialState}
            onSubmit={onSubmit}
            validationSchema={!admin ? changePasswordSchema : changePasswordSchemaAdmin}
        >
            {({isSubmitting, handleSubmit, handleReset}) => (
                <Modal
                    active={showModal}
                    setActive={setShowModal}
                    handleClose={handleReset}
                >
                    <ModalLayout
                        title="Изменить пароль"
                        content={
                            <ChangePasswordForm
                                onShowPassword={onShowPassword}
                                showPassword={showPassword}
                                isSubmitting={isSubmitting}
                                handleSubmit={handleSubmit}
                                admin={admin}
                            />
                        }
                    />
                </Modal>
            )}
        </Formik>
    );
};

export default ChangePasswordModal;
