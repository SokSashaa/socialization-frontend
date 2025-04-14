import React, { FC } from 'react';
import { toast } from 'react-toastify';
import { Formik, FormikHelpers } from 'formik';

import { useCreateOrganizationMutation } from '@modules/Organizations/api/organizaionsApi.slice';
import OrganizationForm from '@modules/Organizations/components/OrganizationForm/EditOrganizationForm';
import { inputFieldsOrganizations } from '@modules/Organizations/config/inputFieldsOrganizations';
import { findFirstErrorWithPath } from '@modules/Organizations/utils/findFirstErrorWithPath';
import { organizationsValidate } from '@modules/Organizations/utils/validate.shema';

import { Portal } from '@components/index';

import { Modal, ModalLayout } from '@UI/index';

import { organizations_dto } from '@dto/organizations.dto';

type CreateOrgModalPropsType = {
    isOpenModal: boolean;
    setShowModal: () => void;
};

const CreateOrganizationModal: FC<CreateOrgModalPropsType> = (props) => {
    const [createOrganization] = useCreateOrganizationMutation();

    const onSubmit = async (
        values: Omit<organizations_dto, 'id'>,
        { resetForm }: FormikHelpers<Omit<organizations_dto, 'id'>>,
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
                findFirstErrorWithPath(error).message || error.message || 'Что-то пошло не так',
            );
        }
    };

    const initialState: Omit<organizations_dto, 'id'> = {
        name: '',
        address: '',
        site: '',
        phone_number: '',
        email: '',
    };

    return (
        <Portal>
            <Modal
                active={props.isOpenModal}
                setActive={props.setShowModal}
            >
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
