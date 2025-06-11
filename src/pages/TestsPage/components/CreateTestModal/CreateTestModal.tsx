import React, {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {Form, Formik, FormikHelpers} from 'formik';
import {useAddTestMutation} from '@app/api/common/testApiSlice';

import {createTestValidate} from '@pages/TestsPage/utils/validate.helper';

import {Portal} from '@components/index';

import {Button, InputText, Modal, ModalLayout} from '@UI/index';

import {Test_dto} from '@dto/testsDtos/test.dto';

import styles from './CreateTestModal.module.scss';

type CreateTestProps = {
	isOpenModal: boolean;
	closeModal: () => void;
};

type CreateTestFormType = Omit<Test_dto, 'id' | 'is_passed' | 'created_at'>;

const initialState: CreateTestFormType = {
	title: '',
	description: '',
	questions: [],
};
const CreateTestModal: FC<CreateTestProps> = ({isOpenModal, closeModal}) => {
	const [addTest] = useAddTestMutation();

	const navigate = useNavigate();

	const onSubmit = async (
		values: CreateTestFormType,
		{resetForm}: FormikHelpers<CreateTestFormType>
	) => {
		try {
			const testId = await addTest(values).unwrap();

			resetForm({values: initialState});
			navigate(`/tests/${testId}/edit`);
			closeModal();
		} catch (error) {
			toast.error(error?.data?.detail || 'Что-то пошло не так');
		}
	};

	return (
		<Portal>
			<Modal active={isOpenModal} handleClose={closeModal}>
				<ModalLayout
					title="Создание теста"
					content={
						<Formik
							initialValues={initialState}
							validationSchema={createTestValidate}
							onSubmit={onSubmit}
						>
							{({isSubmitting}) => (
								<Form method="post" className={styles.creationForm}>
									<InputText
										wrapperClassNames="h-[115px]"
										name="title"
										type="text"
										label="Название"
										maxlength={60}
									/>
									<InputText
										wrapperClassNames="h-auto"
										className="h-[185px]"
										as="textarea"
										name="description"
										type="text"
										label="Описание"
										maxlength={300}
									/>
									<Button
										className={styles.createButton}
										disabled={isSubmitting}
										type="submit"
									>
										{isSubmitting ? 'Добавление...' : 'Добавить'}
									</Button>
								</Form>
							)}
						</Formik>
					}
				/>
			</Modal>
		</Portal>
	);
};

export default CreateTestModal;
