import React, {FC} from 'react';
import {useSearchParams} from 'react-router-dom';
import {ErrorMessage, FormikProps} from 'formik';
import {useGetAllOrganizationsQuery} from '@app/api/common/organizationsApiSlice';

import {transformOrganizationToSelectOptions} from '@pages/Users/utils/data.helper';

import {ChangePropOrganizationInUserType} from '@modules/Profile/components/types';

import {defaultConfigStylesForSearch} from '@UI/formik/FormikSelect/defaultConfigStylesForSearch';
import FormikSelect from '@UI/formik/FormikSelect/FormikSelect';

import css from './OrganizationSelect.module.scss';

interface OrganizationProps {
	formikProps: FormikProps<ChangePropOrganizationInUserType>;
	classNameSelect?: string;
	classNameError?: string;
}

const OrganizationsSelect: FC<OrganizationProps> = (props) => {
	const [searchParams] = useSearchParams();

	const organizations = useGetAllOrganizationsQuery({
		search: searchParams.get('search') || '',
		ordering: 'id',
		offset: 0,
	});

	const onOrganizationSelect = ({value}: {value: string; initialValue: string}) => {
		props.formikProps.setFieldValue('organization', value);
	};

	return (
		<>
			{organizations.data && (
				<div className={css.wrapper}>
					<FormikSelect
						isWithFind
						className={props.classNameSelect}
						name="organization"
						label="Организация"
						stylesForSearch={defaultConfigStylesForSearch}
						options={[
							...transformOrganizationToSelectOptions(organizations.data.results),
						]}
						selectProps={{
							// className: styles.selectInput,
							placeholder: 'Организация',
						}}
						onChange={onOrganizationSelect}
					/>
					<ErrorMessage
						className={props.classNameError}
						name="organization"
						component="span"
					/>
				</div>
			)}
		</>
	);
};

export default OrganizationsSelect;
