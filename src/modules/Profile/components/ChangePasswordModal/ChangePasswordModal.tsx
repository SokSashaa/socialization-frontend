import { useState } from 'react';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useChangePasswordMutation } from '../../api/profileApiSlice';
import { Modal, ModalLayout } from '../../../../UI';
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm';
import { changePasswordSchema } from '../../utils/validation.helper';

const ChangePasswordModal = ({ showModal, setShowModal }) => {
  const [showPassword, setShowPassword] = useState({
    old_password: false,
    new_password: false,
  });
  const [changePassword] = useChangePasswordMutation();

  const initialState = {
    old_password: '',
    new_password: '',
  };

  const onShowPassword = (name) => () => {
    setShowPassword((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      const res = await changePassword(values).unwrap();

      if (!res.success) {
        throw new Error(res.errors[0]);
      }

      toast.success('Пароль изменен');
    } catch (error) {
      toast.error(error?.data?.detail || error.message || 'Что-то пошло не так');
    } finally {
      resetForm({ values: initialState });
    }
  };

  return (
    <Formik
      initialValues={initialState}
      onSubmit={onSubmit}
      validationSchema={changePasswordSchema}
    >
      {({ isSubmitting, handleSubmit, handleReset }) => (
        <Modal
          active={showModal}
          setActive={setShowModal}
          handleClose={handleReset}
        >
          <ModalLayout
            title="Изменить пароль"
            content={
              // eslint-disable-next-line
              <ChangePasswordForm
                onShowPassword={onShowPassword}
                showPassword={showPassword}
                isSubmitting={isSubmitting}
                handleSubmit={handleSubmit}
              />
            }
          />
        </Modal>
      )}
    </Formik>
  );
};

export default ChangePasswordModal;
