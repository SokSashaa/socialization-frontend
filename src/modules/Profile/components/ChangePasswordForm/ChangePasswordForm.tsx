import {Form} from 'formik';
import {EyeIcon, EyeSlashIcon} from '@heroicons/react/24/solid';
import {Button, InputText} from '../../../../UI';
import styles from './ChangePasswordForm.module.css';
import Spinner from "../../../../UI/spinners/Spinner";

const ChangePasswordForm = ({isSubmitting, handleSubmit, showPassword, onShowPassword}) => {
    const submitBtnContent = isSubmitting ? <Spinner typeSpinner={'mini'}/> : 'Сохранить';

    const rightIconPasswordOld = showPassword.old_password ? (
        <EyeSlashIcon
            className={styles.icon}
            onClick={onShowPassword('old_password')}
        />
    ) : (
        <EyeIcon
            className={styles.icon}
            onClick={onShowPassword('old_password')}
        />
    );

    const rightIconPasswordNew = showPassword.new_password ? (
        <EyeSlashIcon
            className={styles.icon}
            onClick={onShowPassword('new_password')}
        />
    ) : (
        <EyeIcon
            className={styles.icon}
            onClick={onShowPassword('new_password')}
        />
    );

    const typePasswordInput = showPassword.new_password ? 'text' : 'password';

    const typePasswordInputOld = showPassword.old_password ? 'text' : 'password';

    return (
        <Form
            className={styles.form}
            method="post"
        >
            <InputText
                wrapperClassNames={styles.inputWrapper}
                name="old_password"
                type={typePasswordInputOld}
                label="Старый пароль"
                rightIcon={rightIconPasswordOld}
            />
            <InputText
                wrapperClassNames={styles.inputWrapper}
                name="new_password"
                type={typePasswordInput}
                label="Новый пароль"
                rightIcon={rightIconPasswordNew}
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
