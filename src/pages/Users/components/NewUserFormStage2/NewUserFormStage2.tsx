import React from 'react';

import {StagesEnum} from '@pages/Users/components/NewUserForm/NewUserForm';

import Avatar from '@UI/Avatar/Avatar';
import {AvatarSizes} from '@UI/Avatar/types';
import {Button, UploadFile} from '@UI/index';
import Spinner from '@UI/spinners/Spinner';

import {userIconV2Big} from '@assets/index';

import styles from './NewUserFormStage2.module.css';

const NewUserFormStage2 = ({formikProps, onGoBack, fileRef, preview, onUpload, refSubmit}) => {
	const submitBtnContent = formikProps.isSubmitting ? <Spinner /> : 'Добавить';

	return (
		<div className="flex h-full flex-col items-center justify-between gap-4">
			<div>
				<Avatar
					id={'avatarReg'}
					defaultPhoto={userIconV2Big}
					photo={preview}
					size={AvatarSizes.XXXL}
				/>

				<UploadFile
					fileRef={fileRef}
					label="Изменить фото"
					className={styles.upload}
					inputProps={{
						name: 'photo',
						accept: 'image/png, image/jpeg, image/jpg',
					}}
					onChange={onUpload(formikProps)}
				/>
			</div>
			<div className={styles.buttonsRef}>
				<Button
					onClick={() => {
						refSubmit.current = StagesEnum.STAGE2;
						onGoBack();
					}}
				>
					Назад
				</Button>
				<Button type="submit" onClick={() => (refSubmit.current = StagesEnum.SUBMIT)}>
					{submitBtnContent}
				</Button>
			</div>
		</div>
	);
};

export default NewUserFormStage2;
