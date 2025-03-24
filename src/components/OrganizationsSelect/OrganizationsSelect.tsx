import FormikSelect from '../../UI/formik/FormikSelect/FormikSelect';
import { transformOrganizationToSelectOptions } from '../../modules/UsersList/utils/data.helper';
import { defaultConfigStylesForSearch } from '../../UI/formik/FormikSelect/defaultConfigStylesForSearch';
import { FC } from 'react';
import { FormikProps } from 'formik';
import { useGetOrganizationsQuery } from '../../app/api/common/organizationsApiSlice';

interface OrganizationProps<T> {
    formikProps: FormikProps<T>;
    classNameSelect?: string;
    classNameError?: string;
}

const OrganizationsSelect: FC<OrganizationProps<any>> = (props) => {

    const organizations = useGetOrganizationsQuery();

    const onOrganizationSelect = ({ value }: { value: string; initialValue: string }) => {
        props.formikProps.setFieldValue('organization', value);
    };

    return (
        <>
            {organizations.data && (
                <FormikSelect
                    className={props.classNameSelect}
                    name="organization"
                    options={[...transformOrganizationToSelectOptions(organizations.data)]}
                    label="Организация"
                    onChange={onOrganizationSelect}
                    selectProps={{
                        // className: styles.selectInput,
                        placeholder: 'Организация',
                    }}
                    isWithFind
                    stylesForSearch={defaultConfigStylesForSearch}
                />
            )}
        </>
    );
};

export default OrganizationsSelect;
