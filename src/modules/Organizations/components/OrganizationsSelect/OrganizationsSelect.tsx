import { FC } from 'react';
import { FormikProps } from 'formik';
import { useGetAllOrganizationsQuery } from '@app/api/common/organizationsApiSlice';

import { ChangePropOrganizationInUserType } from '@modules/Profile/components/types';
import { transformOrganizationToSelectOptions } from '@modules/UsersList/utils/data.helper';

import { defaultConfigStylesForSearch } from '@UI/formik/FormikSelect/defaultConfigStylesForSearch';
import FormikSelect from '@UI/formik/FormikSelect/FormikSelect';

interface OrganizationProps {
    formikProps: FormikProps<ChangePropOrganizationInUserType>;
    classNameSelect?: string;
    classNameError?: string;
}

const OrganizationsSelect: FC<OrganizationProps> = (props) => {
    const organizations = useGetAllOrganizationsQuery('');

    const onOrganizationSelect = ({ value }: { value: string; initialValue: string }) => {
        props.formikProps.setFieldValue('organization', value);
    };

    return (
        <>
            {organizations.data && (
                <FormikSelect
                    isWithFind
                    className={props.classNameSelect}
                    name="organization"
                    options={[...transformOrganizationToSelectOptions(organizations.data)]}
                    label="Организация"
                    stylesForSearch={defaultConfigStylesForSearch}
                    selectProps={{
                        // className: styles.selectInput,
                        placeholder: 'Организация',
                    }}
                    onChange={onOrganizationSelect}
                />
            )}
        </>
    );
};

export default OrganizationsSelect;
