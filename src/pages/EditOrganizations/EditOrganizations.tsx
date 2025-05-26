import {FC} from 'react';
import React from 'react';
import {useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {Formik} from 'formik';
import {
	useChangeOrganizationInfoMutation,
	useGetOrganizationInfoQuery,
} from '@app/api/common/organizationsApiSlice';

import OrganizationForm from '@modules/Organizations/components/OrganizationForm/EditOrganizationForm';
import {inputFieldsOrganizations} from '@modules/Organizations/config/inputFieldsOrganizations';
import {organizationsValidate} from '@modules/Organizations/utils/validate.shema';

import {organizations_dto} from '@dto/organizations/organizations.dto';

import {findFirstErrorWithPath} from '@utils/helpers/findFirstErrorWithPath';

import css from './edit_organization.module.scss';

const EditOrganizations: FC = () => {
	const {id} = useParams();

	const {data} = useGetOrganizationInfoQuery(id || '');

	const [changeOrganizationInfo] = useChangeOrganizationInfoMutation();

	const onSubmit = async (values: organizations_dto) => {
		try {
			const result = await changeOrganizationInfo(values).unwrap();

			if (result.error) {
				throw result.error;
			}

			toast.success('Данные профиля обновлены');
		} catch (error) {
			toast.error(
				findFirstErrorWithPath(error)?.message || error.message || 'Что-то пошло не так'
			);
		}
	};

	return (
		<div className={css.root}>
			{data && (
				<Formik
					initialValues={data}
					validationSchema={organizationsValidate}
					onSubmit={onSubmit}
				>
					{(formikProps) => (
						<OrganizationForm
							formikProps={formikProps}
							itemsInputs={inputFieldsOrganizations}
						/>
					)}
				</Formik>
			)}
		</div>
	);
};
export default EditOrganizations;
