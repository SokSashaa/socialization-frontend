import { FC } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Formik } from 'formik';

import OrganizationForm from '@modules/Organizations/components/OrganizationForm/EditOrganizationForm';
import { inputFieldsOrganizations } from '@modules/Organizations/config/inputFieldsOrganizations';
import { organizationsValidate } from '@modules/Organizations/utils/validate.shema';

import { organizations_dto } from '@dto/organizations.dto';

import css from './edit_organization.module.scss';

const EditOrganizations: FC = () => {
    const { id } = useParams();
    const url = import.meta.env.VITE_SERVER_URL;
    const getOrgInfo = async () => {
        return (await axios.get(url + `organizations/${id}/`)).data;
    };
    const { data } = useQuery(['organizations', id], getOrgInfo);

    const mutate = useMutation((values: organizations_dto) => {
        return axios.put(url + `organizations/${values.id}/update_org/`, values);
    });
    const onSubmit = async (values: organizations_dto) => {
        try {
            mutate.mutate(values);
            if (mutate.isError) {
                throw new Error(mutate.error.message);
            }

            toast.success('Данные профиля обновлены');
        } catch (error) {
            toast.error(error?.data?.detail || error.message || 'Что-то пошло не так');
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
