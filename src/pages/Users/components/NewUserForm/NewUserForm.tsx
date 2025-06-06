import React, {useRef, useState} from 'react';
import {toast} from 'react-toastify';
import {Form, Formik, FormikHelpers} from 'formik';
import {AnimatePresence, m} from 'framer-motion';

import {useAddUserMutation} from '@pages/Users/api/usersApiSlice';
import {initialValuesFormRegistration} from '@pages/Users/components/NewUserForm/config/initialStateForm';
import NewUserFormStage1 from '@pages/Users/components/NewUserFormStage1/NewUserFormStage1';
import NewUserFormStage2 from '@pages/Users/components/NewUserFormStage2/NewUserFormStage2';
import {userPhotoSchema, userSchema} from '@pages/Users/utils/validation.helper';

import {useUploadPhoto} from '@hooks/index';

import {uploadedFileSchema} from '@utils/helpers';
import {findFirstErrorWithPath} from '@utils/helpers/findFirstErrorWithPath';

import styles from './NewUserForm.module.css';

const variants = {
	initial: (direction) => ({
		opacity: 0,
		x: direction === 1 ? '-100%' : '100%',
	}),
	animate: {opacity: 1, x: 0, transition: {duration: 0.25}},
	exit: (direction) => ({
		opacity: 0,
		x: direction === 1 ? '100%' : '-100%',
		transition: {duration: 0.25},
	}),
};

export enum StagesEnum {
	STAGE1 = 'STAGE1',
	STAGE2 = 'STAGE2',
	SUBMIT = 'SUBMIT',
}

const NewUserForm = () => {
	const fileRef = useRef(null);
	const [stage, setStage] = useState(1);
	const submitRef = useRef<StagesEnum>(StagesEnum.STAGE1);
	const [addUser] = useAddUserMutation();

	const {preview, onUpload, resetPreview} = useUploadPhoto('photo');

	// const [getTutors, {isLoading: isLoadingTutors, isFetching: isFetchingTutors, data: tutors}] =
	//     useLazyGetTutorsQuery();

	const validationSchema =
		stage === 1 ? userSchema : uploadedFileSchema(fileRef).concat(userPhotoSchema);

	const onGoBack = () => {
		setStage(1);
	};

	const onSubmit = async (values, {setSubmitting, resetForm}: FormikHelpers<any>) => {
		if (stage === 1) {
			if (submitRef.current === StagesEnum.STAGE1) {
				setStage(2);
			}
			if (submitRef.current === StagesEnum.STAGE2) {
				//костыли, чтобы нормально переход работал
				setStage(1);
				submitRef.current = StagesEnum.STAGE1;
			}
			setSubmitting(false);
		} else if (submitRef.current === StagesEnum.SUBMIT) {
			try {
				const res = await addUser(values).unwrap();
				if (!res.success) {
					if (res.errors.login) {
						throw new Error('Такой логин уже существует');
					} else {
						throw new Error();
					}
				}
				toast.success('Пользователь создан');
				resetForm({values: initialValuesFormRegistration});
				resetPreview();
				onGoBack();
				submitRef.current = StagesEnum.STAGE1;
			} catch (error) {
				toast.error(
					error?.data?.detail ||
						error.message ||
						findFirstErrorWithPath(error)?.message ||
						'Что-то пошло не так'
				);
			}
		}
	};

	return (
		<Formik
			initialValues={initialValuesFormRegistration}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{(formikProps) => (
				<Form className={styles.form}>
					<AnimatePresence initial={false} mode="wait">
						{stage === 1 && (
							<m.div
								className={styles.inner}
								key="stage1"
								variants={variants}
								initial="initial"
								animate="animate"
								exit="exit"
							>
								<NewUserFormStage1 formikProps={formikProps} />
							</m.div>
						)}

						{stage === 2 && (
							<m.div
								className={styles.inner}
								key="stage2"
								variants={variants}
								initial="initial"
								animate="animate"
								exit="exit"
							>
								<NewUserFormStage2
									formikProps={formikProps}
									fileRef={fileRef}
									preview={preview}
									refSubmit={submitRef}
									onGoBack={onGoBack}
									onUpload={onUpload}
								/>
							</m.div>
						)}
					</AnimatePresence>
				</Form>
			)}
		</Formik>
	);
};

export default NewUserForm;
