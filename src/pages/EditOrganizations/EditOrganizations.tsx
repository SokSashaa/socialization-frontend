import {FC} from "react";
import {Formik} from "formik";
import {organizations_dto} from "../../dto/organizations.dto";
import {toast} from "react-toastify";

import {InputFieldType} from "../../modules/Profile/components/ProfileInfoForm/ProfileInfoForm";
import css from './edit_organization.module.scss'
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "react-query";
import axios from "axios";
import OrganizationForm from "../../modules/Organizations/OrganizationForm/EditOrganizationForm";
import {organizationsValidate} from "../../modules/Organizations/utils/validate.shema";

export const inputFieldsOrganizations: InputFieldType[] = [
    {
        name: 'name',
        label: 'Название ',
        type: "text"
    },
    {
        name: 'address',
        label: 'Адрес ',
        type: "text"
    },
    {
        name: 'phone_number',
        label: 'Телефон',
        type: "text"
    },
    {
        name: 'email',
        label: 'Почта',
        type: "email"
    },
    {
        name: 'site',
        label: 'Сайт',
        type: "text"
    },
];


const EditOrganizations: FC = () => {
    const {id} = useParams()
    const url = import.meta.env.VITE_SERVER_URL;
    const getOrgInfo = async () => {
        return (await axios.get(url + `/organizations/${id}/`)).data
    }
    const {data} = useQuery(['organizations', id], getOrgInfo)

    const mutate = useMutation((values: organizations_dto)=>{
        return axios.put(url + `/organizations/${values.id}/update_org/`, values)
    })
    const onSubmit = async (values:organizations_dto) => {
        try {
            mutate.mutate(values)
            if(mutate.isError){
                throw  new Error(mutate.error.message)
            }


            toast.success('Данные профиля обновлены');
        } catch (error) {
            toast.error(error?.data?.detail || error.message || 'Что-то пошло не так');
        }
    };
    return <div className={css.root}>
        {data && <Formik initialValues={data} onSubmit={onSubmit} validationSchema={organizationsValidate}>
            {(formikProps) => (
                <OrganizationForm formikProps={formikProps} itemsInputs={inputFieldsOrganizations}/>
            )}
        </Formik>}

    </div>
}
export default EditOrganizations
