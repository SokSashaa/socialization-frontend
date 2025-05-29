import React, {FC, useRef} from 'react';
import {toast} from 'react-toastify';
import clsx from 'clsx';
import {Form, Formik} from 'formik';
import {useAddGameMutation} from '@app/api/common/gameApiSlice';

import {defaultGameIcon, userIconV2Big} from '@src/assets';
import {useUploadPhoto} from '@src/hooks';

import {Portal} from '@components/index';

import Avatar from '@UI/Avatar/Avatar';
import {AvatarSizes} from '@UI/Avatar/types';
import {Button, InputText, Modal, ModalLayout, UploadFile} from '@UI/index';

import {AddGameDtoRequest} from '@dto/games/addGame.dto';

import styles from './AddGameModal.module.scss';

type CreateTestProps = {
	isOpenModal: boolean;
	closeModal: () => void;
};

const initialState: AddGameDtoRequest = {
	name: '',
	description: '',
	archive_file: '',
	icon: '',
};

export const AddGameModal: FC<CreateTestProps> = ({closeModal, isOpenModal}) => {
	const [addGame] = useAddGameMutation();

	const onSubmit = async (values: AddGameDtoRequest) => {
		try {
			console.log(values);
			const newGame = await addGame(values).unwrap();

			console.log(newGame);
		} catch (error) {
			toast.error(error?.data?.detail || 'Что-то пошло не так');
		}
	};

	const iconRef = useRef(null);
	const arciveRef = useRef(null);

	const {preview, onUpload} = useUploadPhoto('icon');

	return (
		<Portal>
			<Modal active={isOpenModal} handleClose={closeModal}>
				<ModalLayout
					title="Добавление игры"
					content={
						<Formik initialValues={initialState} onSubmit={onSubmit}>
							{(formikProps) => (
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
									<div className="flex justify-between items-center">
										<div className="flex flex-col items-start gap-2">
											<Avatar
												id={'Avatar'}
												defaultPhoto={defaultGameIcon}
												photo={preview}
												size={AvatarSizes.SMALL}
											/>

											<UploadFile
												fileRef={iconRef}
												label="Иконка"
												className={styles.upload}
												inputProps={{
													name: 'icon',
													accept: 'image/png, image/jpeg, image/jpg',
												}}
												onChange={() => onUpload(formikProps)}
											/>

											<UploadFile
												label={'Архив с игрой'}
												fileRef={arciveRef}
												className={clsx(
													styles.upload,
													styles.archiveUpload
												)}
												inputProps={{
													name: 'archive_file',
													accept: 'application/x-zip-compressed',
													multiple: false,
													onChange: (
														e: React.ChangeEvent<HTMLInputElement>
													) => {
														if (e.target.files === null) {
															return;
														}
														const file = e.target.files[0];
														const reader = new FileReader();
														reader.readAsDataURL(file);
														reader.onloadend = () => {
															const base64data = reader.result;
															if (typeof base64data === 'string') {
																formikProps.setFieldValue(
																	'archive_file',
																	base64data
																);
															}
														};
													},
												}}
											/>
										</div>

										<Button type="submit">
											{formikProps.isSubmitting
												? 'Добавление...'
												: 'Добавить'}
										</Button>
									</div>
								</Form>
							)}
						</Formik>
					}
				/>
			</Modal>
		</Portal>
	);
};
