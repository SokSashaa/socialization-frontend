import {ErrorMessage} from 'formik';
import {Button, FormikSelect, InputText} from '../../../../UI';
import {transformOrganizationToSelectOptions, transformUsersToSelectOptions} from '../../utils/data.helper';
import {ROLES} from '../../../../utils/constants';
import styles from './NewUserFormStage1.module.css';
import Spinner from "../../../../UI/spinners/Spinner";


const NewUserFormStage1 = ({
                               selectRoles,
                               tutors,
                               onRoleSelect,
                               isLoadingTutors,
                               formikProps,
                               onOrganizationSelect,
                               organizations,
                               onTutorSelect
                           }) => {
    const {isSubmitting, values} = formikProps;

    const submitBtnContent = isSubmitting ? <Spinner typeSpinner={'mini'}/> : 'Далее';
    return (
        <>
            <div className={styles.row}>
                <InputText
                    wrapperClassNames={styles.inputText}
                    name="name"
                    label="Имя *"
                />
                <InputText
                    wrapperClassNames={styles.inputText}
                    name="second_name"
                    label="Фамилия *"
                />
                <InputText
                    wrapperClassNames={styles.inputText}
                    name="patronymic"
                    label="Отчество (при наличии)"
                />
            </div>
            <div className={styles.row}>
                <InputText
                    wrapperClassNames={styles.inputText}
                    name="birthday"
                    label="Дата рождения *"
                    type="date"
                />
                <InputText
                    wrapperClassNames={styles.inputText}
                    name="email"
                    label="Почта *"
                />
            </div>
            <div className={styles.row}>
                <InputText
                    wrapperClassNames={styles.inputText}
                    name="login"
                    label="Логин *"
                />
                <InputText
                    wrapperClassNames={styles.inputText}
                    name="password"
                    label="Пароль *"
                />
            </div>
            <div className={styles.row}>
                <FormikSelect
                    className={styles.select}
                    name="role.code"
                    options={selectRoles}
                    label="Роль"
                    // onChange={onRoleSelect(formikProps)}
                    selectProps={{
                        className: styles.selectInput,
                    }}
                />

                {isLoadingTutors && (
                    <div className="basis-20 self-center">
                        <Spinner typeSpinner={'mini'}/>
                    </div>
                )}

                {values.role.code === ROLES.observed.code && !isLoadingTutors && (
                    <div className={styles.selectContainer}>
                        <FormikSelect
                            name="role.tutor_id"
                            options={[
                                ...transformUsersToSelectOptions(tutors),
                            ]}
                            label="Наставник"
                            isWithFind
                            onChange={onTutorSelect}
                            selectProps={{
                                className: styles.selectInput,
                                placeholder: 'Наставник'
                            }}
                            stylesForSearch={{
                                control: (base, state) => ({
                                    ...base,
                                    ":hover": {borderColor: state.isFocused ? 'blue' : 'black'},
                                    borderColor: state.isFocused ? 'blue' : 'black',
                                    boxShadow: 'none',
                                    width: '100%',
                                    height: '55px',
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    ":hover": {backgroundColor: 'gray', color: 'white'},
                                    backgroundColor: state.isSelected ? 'gray' : 'white',
                                    borderBottom: '1px solid gray',
                                    height: '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }),
                                placeholder: (base) => ({
                                    ...base,
                                    color: 'black'
                                }),
                                menuList: (base) => ({
                                    ...base, padding: 0, margin: 0,
                                    borderRadius: '10px',
                                    border: '1px solid gray'
                                }),
                                menu: (base) => ({
                                    ...base,
                                    boxShadow: 'none',
                                })
                            }}
                        />
                        <ErrorMessage
                            className={styles.selectError}
                            name="role.tutor_id"
                            component="span"
                        />
                    </div>)
                }
            </div>
            <div className={styles.row}>
                {organizations && <FormikSelect
                    className={styles.select}
                    name="organization"
                    options={[
                        ...transformOrganizationToSelectOptions(organizations)
                    ]}
                    label="Организация"
                    onChange={onOrganizationSelect}
                    selectProps={{
                        className: styles.selectInput,
                        placeholder: 'Организация',
                    }}
                    isWithFind
                    stylesForSearch={{
                        control: (base, state) => ({
                            ...base,
                            ":hover": {borderColor: state.isFocused ? 'blue' : 'black'},
                            borderColor: state.isFocused ? 'blue' : 'black',
                            boxShadow: 'none',
                            width: '100%',
                            height: '55px',
                        }),
                        option: (base, state) => ({
                            ...base,
                            ":hover": {backgroundColor: 'gray', color: 'white'},
                            backgroundColor: state.isSelected ? 'gray' : 'white',
                            borderBottom: '1px solid gray',
                            height: '30px',
                            display: 'flex',
                            alignItems: 'center',
                        }),
                        placeholder: (base) => ({
                            ...base,
                            color: 'black'
                        }),
                        menuList: (base) => ({
                            ...base, padding: 0, margin: 0,
                            borderRadius: '10px',
                        }),
                        menu: (base) => ({
                            ...base,
                            boxShadow: 'none'
                        })
                    }}
                />}
            </div>
            <div className={styles.btnRow}>
                <Button type="submit">{submitBtnContent}</Button>
            </div>
        </>
    );
};

export default NewUserFormStage1;
