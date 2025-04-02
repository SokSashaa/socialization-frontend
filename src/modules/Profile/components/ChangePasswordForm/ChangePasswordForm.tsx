import {Form} from 'formik';
import {EyeIcon, EyeSlashIcon} from '@heroicons/react/24/solid';
import {Button, InputText} from '../../../../UI';
import styles from './ChangePasswordForm.module.css';
import Spinner from "../../../../UI/spinners/Spinner";
import {FC, FormEvent} from "react";

type ChangePasswordFormProps = {
    isSubmitting: boolean,
    handleSubmit: (e?: FormEvent<HTMLFormElement>) => void,
    showPassword: any,
    onShowPassword?: any,
    admin?: boolean
}

const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
                                                             isSubmitting,
                                                             handleSubmit,
                                                             showPassword,
                                                             onShowPassword,
                                                             admin
                                                         }) => {
    const submitBtnContent = isSubmitting ? <Spinner typeSpinner={'mini'}/> : 'Сохранить';

    // const rightIconPasswordOld = showPassword.old_password ? ( //TODO: Посмотреть, как ведет себя без этого
    //     <EyeSlashIcon
    //         className={styles.icon}
    //         onClick={onShowPassword('old_password')}
    //     />
    // ) : (
    //     <EyeIcon
    //         className={styles.icon}
    //         onClick={onShowPassword('old_password')}
    //     />
    // );
    //
    // const rightIconPasswordNew = showPassword.new_password ? (
    //     <EyeSlashIcon
    //         className={styles.icon}
    //         onClick={onShowPassword('new_password')}
    //     />
    // ) : (
    //     <EyeIcon
    //         className={styles.icon}
    //         onClick={onShowPassword('new_password')}
    //     />
    // );

    const typePasswordInput = showPassword.new_password ? 'text' : 'password';

    const typePasswordInputOld = showPassword.old_password ? 'text' : 'password';

    return (
        <Form
            className={styles.form}
            method="post"
        >
            {!admin && <InputText
                wrapperClassNames={styles.inputWrapper}
                name="old_password"
                type={typePasswordInputOld}
                label="Старый пароль"
                // rightIcon={rightIconPasswordOld}
            />}
            <InputText
                wrapperClassNames={styles.inputWrapper}
                name="new_password"
                type={typePasswordInput}
                label="Новый пароль"
                // rightIcon={rightIconPasswordNew}
            />
            <Button
                className={styles.button}
                onClick={handleSubmit}
                disabled={isSubmitting}
                type="submit"
            >
                {submitBtnContent}
            </Button>
        </Form>
    );
};

export default ChangePasswordForm;
