import {FC} from 'react';
import React from 'react';
import {FormikProps} from 'formik';

import OrganizationsSelect from '@pages/Organizations/components/OrganizationsSelect/OrganizationsSelect';

import RoleSelect from '@modules/Profile/components/RoleSelect/RoleSelect';

import {Button, InputText} from '@UI/index';
import Spinner from '@UI/spinners/Spinner';

import {ROLES} from '@utils/constants';

import styles from './NewUserFormStage1.module.css';

interface NewUserFormStage1Props<T> {
	formikProps: FormikProps<T>;
}

const NewUserFormStage1: FC<NewUserFormStage1Props<any>> = ({formikProps}) => {
	const {isSubmitting, values} = formikProps;

	const submitBtnContent = isSubmitting ? <Spinner /> : 'Далее';

	return (
		<>
			<div className={styles.row}>
				<InputText wrapperClassNames={styles.inputText} name="name" label="Имя *" />
				<InputText
					wrapperClassNames={styles.inputText}
					name="second_name"
					label="Фамилия *"
				/>
				<InputText
					wrapperClassNames={styles.inputText}
					name="patronymic"
					label="Отчество (при наличии)"
				/>
			</div>
			<div className={styles.row}>
				<InputText
					wrapperClassNames={styles.inputText}
					name="birthday"
					label="Дата рождения *"
					type="date"
				/>
				<InputText wrapperClassNames={styles.inputText} name="email" label="Почта *" />
				<InputText
					wrapperClassNames={styles.inputText}
					name="phone_number"
					label="Телефон *"
				/>
			</div>
			<div className={styles.row}>
				<InputText wrapperClassNames={styles.inputText} name="login" label="Логин *" />
				<InputText wrapperClassNames={styles.inputText} name="password" label="Пароль *" />
			</div>
			{values.role.code === ROLES.observed.code && (
				<div className={styles.row}>
					<InputText
						wrapperClassNames={styles.inputText}
						name="address"
						label="Адрес *"
					/>
				</div>
			)}
			<div className={styles.row}>
				<RoleSelect
					formikProps={formikProps}
					classNameError={styles.selectError}
					classNameSelect={styles.select}
				/>
			</div>
			<div className={styles.row}>
				<OrganizationsSelect
					formikProps={formikProps}
					classNameError={styles.selectError}
					classNameSelect={styles.select}
				/>
			</div>
			<div className={styles.btnRow}>
				<Button type="submit">{submitBtnContent}</Button>
			</div>
		</>
	);
};

export default NewUserFormStage1;
