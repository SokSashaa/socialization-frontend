import React, {FC} from 'react';
import {toast} from 'react-toastify';
import {Formik, FormikHelpers} from 'formik';
import {useCreateOrganizationMutation} from '@app/api/common/organizationsApiSlice';

import OrganizationForm from '@pages/Organizations/components/OrganizationForm/EditOrganizationForm';

import {inputFieldsOrganizations} from '@modules/Organizations/config/inputFieldsOrganizations';
import {organizationsValidate} from '@modules/Organizations/utils/validate.shema';

import {Portal} from '@components/index';

import {Modal, ModalLayout} from '@UI/index';

import {organizations_dto} from '@dto/organizations/organizations.dto';

import {findFirstErrorWithPath} from '@utils/helpers/findFirstErrorWithPath';

type CreateOrgModalPropsType = {
	isOpenModal: boolean;
	setShowModal: () => void;
};

const CreateOrganizationModal: FC<CreateOrgModalPropsType> = (props) => {
	const [createOrganization] = useCreateOrganizationMutation();

	const initialState: Omit<organizations_dto, 'id'> = {
		name: '',
		address: '',
		site: '',
		phone_number: '',
		email: '',
	};

	const onSubmit = async (
		values: typeof initialState,
		{resetForm}: FormikHelpers<typeof initialState>
	) => {
		try {
			const organization = await createOrganization(values).unwrap();

			if (organization.error) {
				throw organization.error;
			}

			props.setShowModal();

			resetForm();
			toast.success('Организация создана');
		} catch (error) {
			toast.error(
				findFirstErrorWithPath(error)?.message || error.message || 'Что-то пошло не так'
			);
		}
	};

	return (
		<Portal>
			<Modal active={props.isOpenModal} handleClose={props.setShowModal}>
				<ModalLayout
					title="Создание организации"
					content={
						<Formik
							initialValues={initialState}
							validationSchema={organizationsValidate}
							onSubmit={onSubmit}
						>
							{(formikProps) => (
								<OrganizationForm
									itemsInputs={inputFieldsOrganizations}
									formikProps={formikProps}
									buttonText={'Создать'}
								/>
							)}
						</Formik>
					}
				/>
			</Modal>
		</Portal>
	);
};

export default CreateOrganizationModal;
