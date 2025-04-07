import React, { FC } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Formik } from 'formik';

import OrganizationForm from '@modules/Organizations/OrganizationForm/EditOrganizationForm';
import { organizationsValidate } from '@modules/Organizations/utils/validate.shema';

import { Modal, ModalLayout } from '@UI/index';

import { organizations_dto } from '@dto/organizations.dto';

import { inputFieldsOrganizations } from '../../EditOrganizations/EditOrganizations';
// import styles from "../../../modules/ComponentList/components/CreateTestForm/CreateTestForm.module.scss";

type CreateOrgModalPropsType = {
    isOpenModal: boolean;
    setShowModal: () => void;
};
const CreateOrganizationModal: FC<CreateOrgModalPropsType> = (props) => {
    const queryClient = useQueryClient();
    const url = import.meta.env.VITE_SERVER_URL;

    const mutate = useMutation(
        async (body: Omit<organizations_dto, 'id'>) => {
            return (await axios.post(url + 'organizations/create_org/', body)).data;
        },
        {
            onSuccess: () => queryClient.invalidateQueries('organizations'),
        },
    );

    const onSubmit = async (values: Omit<organizations_dto, 'id'>) => {
        try {
            mutate.mutate(values);
            toast.success('Организация создана');
            props.setShowModal();
        } catch (error) {
            toast.error(error?.data?.detail || error.message || 'Что-то пошло не так');
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
        <Formik
            initialValues={initialState}
            validationSchema={organizationsValidate}
            onSubmit={onSubmit}
        >
            {(formikProps) => (
                <Modal
                    active={props.isOpenModal}
                    setActive={props.setShowModal}
                    handleClose={formikProps.handleReset}
                >
                    <ModalLayout
                        title="Создание организации"
                        content={
                            <OrganizationForm
                                itemsInputs={inputFieldsOrganizations}
                                formikProps={formikProps}
                                buttonText={'Создать'}
                            />
                        }
                    />
                </Modal>
            )}
        </Formik>
    );
};

export default CreateOrganizationModal;
