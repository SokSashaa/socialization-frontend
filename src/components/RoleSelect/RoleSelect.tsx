import { FC } from 'react';
import { ErrorMessage, FormikProps } from 'formik';
import {
    rolesSelectOptions,
    transformUsersToSelectOptions,
} from '../../modules/UsersList/utils/data.helper';
import { ROLES } from '../../utils/constants';
import FormikSelect from '../../UI/formik/FormikSelect/FormikSelect';
import css from './RoleSelect.module.scss';
import { useGetTutorsQuery } from '../../app/api/common/usersApiSlice';
import { defaultConfigStylesForSearch } from '../../UI/formik/FormikSelect/defaultConfigStylesForSearch';
import Spinner from '../../UI/spinners/Spinner';

interface RoleSelectProps<T> {
    formikProps: FormikProps<T>;
    classNameSelect?: string;
    classNameError?: string;
}

const RoleSelect: FC<RoleSelectProps<any>> = (props) => {
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
                // onChange={onRoleSelect(formikProps)}
                selectProps={{
                    className: css.selectInput,
                }}
            />

            {isLoading && (
                <div className="basis-20 self-center">
                    <Spinner typeSpinner={'mini'} />
                </div>
            )}

            {values.role.code === ROLES.observed.code && tutors && (
                <div className={css.selectContainer}>
                    <FormikSelect
                        name="role.tutor_id"
                        options={[...transformUsersToSelectOptions(tutors)]}
                        label="Наставник"
                        isWithFind
                        onChange={onTutorSelect}
                        selectProps={{
                            className: props.classNameSelect,
                            placeholder: 'Наставник',
                        }}
                        stylesForSearch={defaultConfigStylesForSearch}
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
