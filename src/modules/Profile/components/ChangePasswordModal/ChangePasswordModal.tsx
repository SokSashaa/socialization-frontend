import {FC, useCallback, useState} from 'react';
import React from 'react';
import {useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {Formik, FormikHelpers, FormikProps} from 'formik';

import {Modal, ModalLayout} from '@UI/index';

import {useChangePasswordAdminMutation, useChangePasswordMutation} from '../../api/profileApiSlice';
import {changePasswordSchema, changePasswordSchemaAdmin} from '../../utils/validation.helper';
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm';

import {PasswordArray} from './types';

type ChangePasswordModalProps = {
	showModal: boolean;
	setShowModal: () => void;
	admin?: boolean;
};
const ChangePasswordModal: FC<ChangePasswordModalProps> = ({showModal, setShowModal, admin}) => {
	const {id} = useParams();

	const [showPassword, setShowPassword] = useState({
		old_password: false,
		new_password: false,
	});

	const [changePasswordByAdmin] = useChangePasswordAdminMutation();
	const [changePasswordByUser] = useChangePasswordMutation();

	const initialState: PasswordArray = {
		old_password: '',
		new_password: '',
	};

	const onSubmit = useCallback(
		async (values: PasswordArray, {resetForm}: FormikHelpers<PasswordArray>) => {
			try {
				let res;
				if (admin) {
					res = await changePasswordByAdmin({id, data: values}).unwrap();
				} else {
					res = await changePasswordByUser(values).unwrap();
				}

				if (!res.success) {
					// тут ошибка

					throw new Error(res.errors[0]);
				}

				toast.success('Пароль изменен');
			} catch (error) {
				toast.error(error?.data?.detail || error.message || 'Что-то пошло не так');
			} finally {
				resetForm({values: initialState});
				setShowModal();
			}
		},
		[admin, changePasswordByAdmin, changePasswordByUser, setShowModal] //TODO: Массив зависимостей проверить
	);

	return (
		<Formik
			initialValues={initialState}
			validationSchema={!admin ? changePasswordSchema : changePasswordSchemaAdmin}
			onSubmit={onSubmit}
		>
			{({isSubmitting, handleSubmit, handleReset}: FormikProps<PasswordArray>) => (
				<Modal
					active={showModal}
					handleClose={() => {
						setShowModal();
						handleReset();
					}}
				>
					<ModalLayout
						title="Изменить пароль"
						content={
							<ChangePasswordForm
								// onShowPassword={onShowPassword}
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
