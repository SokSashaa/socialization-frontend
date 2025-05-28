import React, {FC} from 'react';
import {Form, Formik} from 'formik';

import styles from '@pages/TestsPage/components/CreateTestModal/CreateTestModal.module.scss';

import {Portal} from '@components/index';

import {Button, InputText, Modal, ModalLayout} from '@UI/index';

import {game_dto} from '@dto/games/game.dto';

type CreateTestProps = {
	isOpenModal: boolean;
	closeModal: () => void;
};

type CreateGameFormType = Omit<game_dto, 'id' | 'link'> & {
	archive_file: string;
};

const initialState: CreateGameFormType = {
	name: '',
	description: '',
	archive_file: '',
	icon: '',
};

export const AddGameModal: FC<CreateTestProps> = ({closeModal, isOpenModal}) => {
	const onSubmit = (values: CreateGameFormType) => {
		console.log(values);
	};

	return (
		<Portal>
			<Modal active={isOpenModal} handleClose={closeModal}>
				<ModalLayout
					title="Добавление игры"
					content={
						<Formik initialValues={initialState} onSubmit={onSubmit}>
							{({isSubmitting}) => (
								<Form method="post" className={styles.creationForm}>
									<InputText
										wrapperClassNames="h-[115px]"
										name="name"
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
									{/*<UploadFile*/}
									{/*	fileRef={fileRef}*/}
									{/*	label="Изменить фото"*/}
									{/*	className={styles.upload}*/}
									{/*	inputProps={{*/}
									{/*		name: 'icon',*/}
									{/*		accept: 'image/png, image/jpeg, image/jpg',*/}
									{/*	}}*/}
									{/*	onChange={onUpload(formikProps)}*/}
									{/*/>*/}
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
