import {FC} from "react";
import {Button} from "../../../UI";
import {Form} from "formik";
import InputText from "../../../UI/formik/InputText/InputText";
import {InputFieldType} from "../../Profile/components/ProfileInfoForm/ProfileInfoForm";
import css from './edit_organization_form.module.scss'

type OrganizationPropsType = {
    formikProps?: any,
    itemsInputs?: InputFieldType[]
    buttonText?: string,
}
const OrganizationForm: FC<OrganizationPropsType> = ({buttonText='Сохранить', formikProps, itemsInputs,onSubmit}) => {
    return (
        <Form className={css.root}>
            {itemsInputs?.map(item =>
                <InputText
                key={item.name}
                label={item.label}
                name={item.name}
                type={item.type}/>)}
            <Button
                type="submit"
                disabled={formikProps.isSubmitting}
            >
                {buttonText}
            </Button>
        </Form>
    )
}
export default OrganizationForm
