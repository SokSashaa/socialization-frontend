import {Button, InputText} from '../../../../UI';
import styles from './NewUserFormStage1.module.css';
import Spinner from "../../../../UI/spinners/Spinner";
import RoleSelect from "../../../../components/RoleSelect/RoleSelect";
import OrganizationsSelect from "../../../../components/OrganizationsSelect/OrganizationsSelect";
import {FormikProps} from "formik";
import {FC} from "react";

interface NewUserFormStage1Props<T> {
    formikProps: FormikProps<T>
}

const NewUserFormStage1: FC<NewUserFormStage1Props<any>> = ({
                                                                formikProps,
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
                <RoleSelect formikProps={formikProps} classNameError={styles.selectError}
                            classNameSelect={styles.select}/>
            </div>
            <div className={styles.row}>
                <OrganizationsSelect formikProps={formikProps} classNameError={styles.selectError}
                                     classNameSelect={styles.select}/>
            </div>
            <div className={styles.btnRow}>
                <Button type="submit">{submitBtnContent}</Button>
            </div>
        </>
    );
};

export default NewUserFormStage1;
