import { FC } from 'react';
import { ErrorMessage, FormikProps } from 'formik';
import { useGetTutorsQuery } from '@app/api/common/usersApiSlice';

import { UserWithRoleCodeType } from '@modules/Profile/components/types';
import {
    rolesSelectOptions,
    transformUsersToSelectOptions,
} from '@modules/UsersList/utils/data.helper';

import { defaultConfigStylesForSearch } from '@UI/formik/FormikSelect/defaultConfigStylesForSearch';
import FormikSelect from '@UI/formik/FormikSelect/FormikSelect';
import Spinner from '@UI/spinners/Spinner';

import { ROLES } from '@utils/constants';

import css from './RoleSelect.module.scss';

interface RoleSelectProps {
    formikProps: FormikProps<UserWithRoleCodeType>;
    classNameSelect?: string;
    classNameError?: string;
}

const RoleSelect: FC<RoleSelectProps> = (props) => {
    const { values } = props.formikProps;

    const { data: tutors, isLoading } = useGetTutorsQuery();

    const selectRoles = rolesSelectOptions();

    const onTutorSelect = ({ value }: { value: string; initialValue: string }) => {
        props.formikProps.setFieldValue('role.tutor_id', value);
    };

    return (
        <>
            <FormikSelect
                className={props.classNameSelect}
                name="role.code"
                options={selectRoles}
                label="Роль"
                selectProps={{
                    className: css.selectInput,
                }}
            />

            {isLoading && (
                <div className="basis-20 self-center">
                    <Spinner />
                </div>
            )}

            {values.role.code === ROLES.observed.code && tutors && (
                <div className={css.selectContainer}>
                    <FormikSelect
                        isWithFind
                        name="role.tutor_id"
                        options={[...transformUsersToSelectOptions(tutors)]}
                        label="Наставник"
                        stylesForSearch={defaultConfigStylesForSearch}
                        selectProps={{
                            className: props.classNameSelect,
                            placeholder: 'Наставник',
                        }}
                        onChange={onTutorSelect}
                    />
                    <ErrorMessage
                        className={props.classNameError}
                        name="role.tutor_id"
                        component="span"
                    />
                </div>
            )}
        </>
    );
};

export default RoleSelect;
