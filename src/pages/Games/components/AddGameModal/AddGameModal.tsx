import React, {FC, useRef} from 'react';
import {toast} from 'react-toastify';
import clsx from 'clsx';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {useAddGameMutation} from '@app/api/common/gameApiSlice';

import {defaultGameIcon} from '@src/assets';
import {useUploadPhoto} from '@src/hooks';

import {Portal} from '@components/index';

import Avatar from '@UI/Avatar/Avatar';
import {AvatarSizes} from '@UI/Avatar/types';
import {Button, InputText, Modal, ModalLayout, UploadFile} from '@UI/index';
import {Tooltip} from '@UI/Tooltip/Tooltip';

import {AddGameDtoRequest, AddGameKeys} from '@dto/games/addGame.dto';

import useUploadFile from '@hooks/useUploadFile';

import styles from './AddGameModal.module.scss';

type CreateGameProps = {
	isOpenModal: boolean;
	closeModal: () => void;
};

const initialState = {
	name: '',
	description: '',
	archive_file: null,
	icon: '',
};
type FormType = Omit<AddGameDtoRequest, 'archive_file'> & {
	archive_file: File | null;
};

const appendToFormData = (formData: FormData, key: AddGameKeys, value: string | File) => {
	formData.append(key, value);
};

export const AddGameModal: FC<CreateGameProps> = ({closeModal, isOpenModal}) => {
	const [addGame] = useAddGameMutation();

	const onSubmit = async (values: FormType) => {
		try {
			if (values.archive_file === null) {
				throw new Error();
			}

			const payload = new FormData();

			appendToFormData(payload, 'name', values.name);
			appendToFormData(payload, 'description', values.description);
			appendToFormData(payload, 'icon', values.icon || initialState.icon);
			appendToFormData(payload, 'archive_file', values.archive_file);

			const newGame = await addGame(payload).unwrap();
			toast.success(
				'Успешно добавлена игра ' + newGame.result.name ? newGame.result.name : ''
			);
			closeModal();
		} catch (error) {
			toast.error(error?.data?.detail || 'Что-то пошло не так');
		}
	};

	const iconRef = useRef<HTMLInputElement>(null);
	const archiveRef = useRef<HTMLInputElement>(null);

	const {preview, onUpload} = useUploadPhoto('icon');
	const {preview: zipPreview, onUpload: onZipUpload} = useUploadFile('archive_file');

	return (
		<Portal>
			<Modal active={isOpenModal} handleClose={closeModal}>
				<ModalLayout
					title="Добавление игры"
					content={
						<Formik
							initialValues={initialState}
							validationSchema={validationSchema}
							onSubmit={onSubmit}
						>
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
											<div className="flex items-center gap-1">
												<UploadFile
													fileRef={iconRef}
													label="Иконка"
													className={styles.upload}
													inputProps={{
														name: 'icon',
														accept: 'image/png, image/jpeg, image/jpg',
														onChange: onUpload(formikProps),
													}}
												/>
												{preview !== '' && preview !== null && (
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5 text-green-500"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path
															fillRule="evenodd"
															d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
															clipRule="evenodd"
														/>
													</svg>
												)}
											</div>

											<div className="flex items-center gap-1">
												<UploadFile
													label={'Архив с игрой'}
													fileRef={archiveRef}
													className={clsx(
														styles.upload,
														styles.archiveUpload
													)}
													inputProps={{
														name: 'archive_file',
														accept: 'application/x-zip-compressed',
														multiple: false,
														onChange: onZipUpload(formikProps),
													}}
												/>

												{zipPreview !== null &&
													!formikProps.errors.archive_file && (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="h-5 w-5 text-green-500"
															viewBox="0 0 20 20"
															fill="currentColor"
														>
															<path
																fillRule="evenodd"
																d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
																clipRule="evenodd"
															/>
														</svg>
													)}

												<Tooltip>
													<h3 className="font-bold mb-2">
														Требования к архиву
													</h3>
													<ul className="list-disc pl-4 space-y-2">
														<li>
															Формат архива: <b>.zip</b>
														</li>
														<li>
															Максимальный размер файла: <b>150Мб</b>
														</li>
														<li>Игра собрана для WEB</li>
														<li>
															В самом верхнем разделе находится
															основной файл index.html
														</li>
													</ul>
												</Tooltip>
											</div>
										</div>

										<Button type="submit" disabled={formikProps.isSubmitting}>
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

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Название обязательно').max(150, 'Максимальная длина 150 символов'),
	description: Yup.string()
		.required('Описание обязательно')
		.max(300, 'Максимальная длина 300 символов'),
	archive_file: Yup.mixed<File>()
		.required('Архив с игрой обязателен')
		.test('is-correct-file', 'Слишком большой файл', checkIfFileIsTooBig)
		.test('is-big-file', 'Файл неверного типа', checkIfFileIsCorrectType),
});

export function checkIfFileIsTooBig(file?: File): boolean {
	let valid = true;
	if (file) {
		const size = file.size / 1024 / 1024;
		if (size > 150) {
			valid = false;
		}
	}

	return valid;
}

export function checkIfFileIsCorrectType(file?: File): boolean {
	let valid = true;
	if (file) {
		if (!['application/x-zip-compressed', '.zip'].includes(file.type)) {
			valid = false;
		}
	}

	return valid;
}
