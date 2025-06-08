import React, {FC} from 'react';
import {ErrorMessage, FormikProps} from 'formik';
import {useGetTutorsQuery} from '@app/api/common/usersApiSlice';

import {rolesSelectOptions, transformUsersToSelectOptions} from '@pages/Users/utils/data.helper';

import {ChangePropOrganizationInUserType} from '@modules/Profile/components/types';

import {defaultConfigStylesForSearch} from '@UI/formik/FormikSelect/defaultConfigStylesForSearch';
import FormikSelect from '@UI/formik/FormikSelect/FormikSelect';
import Spinner from '@UI/spinners/Spinner';

import {ROLES} from '@utils/constants';

import css from './RoleSelect.module.scss';
import {configStyleForSearch} from '@modules/Profile/components/RoleSelect/config/configStyleForSearch';

interface RoleSelectProps {
	formikProps: FormikProps<ChangePropOrganizationInUserType>;
	classNameSelect?: string;
	classNameError?: string;
}

const RoleSelect: FC<RoleSelectProps> = (props) => {
	const {values} = props.formikProps;

	const {data: tutors, isLoading} = useGetTutorsQuery({
		text: '',
	});

	const selectRoles = rolesSelectOptions();

	const onTutorSelect = ({value}: {value: string; initialValue: string}) => {
		props.formikProps.setFieldValue('role.tutor_id', value);
	};

	return (
		<>
			<FormikSelect
				className={props.classNameSelect}
				name="role.code"
				options={selectRoles}
				label="Роль"
				selectProps={{
					className: css.selectInput,
				}}
			/>

			{isLoading && (
				<div className="basis-20 self-center">
					<Spinner />
				</div>
			)}

			{values.role.code === ROLES.observed.code && tutors && (
				<div className={css.selectContainer}>
					<FormikSelect
						isWithFind
						name="role.tutor_id"
						options={[...transformUsersToSelectOptions(tutors.results)]}
						label="Наставник"
						stylesForSearch={configStyleForSearch}
						selectProps={{
							className: props.classNameSelect,
							placeholder: 'Наставник',
						}}
						onChange={onTutorSelect}
					/>
					<ErrorMessage
						className={props.classNameError}
						name="role.tutor_id"
						component="span"
					/>
				</div>
			)}
		</>
	);
};

export default RoleSelect;
