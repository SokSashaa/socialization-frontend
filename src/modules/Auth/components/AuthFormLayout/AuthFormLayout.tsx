import { Form, FormikProps } from 'formik';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { Button, InputText } from '@UI/index';
import { bg1Desktop, bg1Mobile, bg2Desktop, bg2Mobile, bg3Desktop, bg3Mobile } from '@assets/index';
import styles from './AuthFormLayout.module.css';
import Spinner from '@UI/spinners/Spinner';
import { AuthType } from '@modules/Auth/components/AuthForm/types';
import { FC } from 'react';

interface AuthFormLayoutProps {
    isMobile: boolean;
    showPassword: boolean;
    formikProps: FormikProps<AuthType>;
    onShowPassword: () => void;
}

const AuthFormLayout: FC<AuthFormLayoutProps> = (props) => {
    const {
        isMobile,
        onShowPassword,
        showPassword,
        formikProps: { isSubmitting, handleSubmit },
    } = props;

    const submitBtnContent = isSubmitting ? <Spinner /> : 'Войти';

    const bg1 = isMobile ? bg1Mobile : bg1Desktop;
    const bg2 = isMobile ? bg2Mobile : bg2Desktop;
    const bg3 = isMobile ? bg3Mobile : bg3Desktop;

    const rightIconPassword = showPassword ? (
        <EyeSlashIcon
            className={styles.icon}
            onClick={onShowPassword}
        />
    ) : (
        <EyeIcon
            className={styles.icon}
            onClick={onShowPassword}
        />
    );

    const typePasswordInput = showPassword ? 'text' : 'password';

    return (
        <div className={styles.wrapper}>
            <Form
                method="post"
                className={styles.form}
            >
                <span>Авторизация</span>
                <InputText
                    name="login"
                    placeholder="Логин"
                    wrapperClassNames={styles.loginInput}
                />
                <InputText
                    name="password"
                    placeholder="Пароль"
                    wrapperClassNames={styles.loginInput}
                    rightIcon={rightIconPassword}
                    type={typePasswordInput}
                />
                <Button
                    className={styles.loginButton}
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    type="submit"
                >
                    {submitBtnContent}
                </Button>
            </Form>
            <div className={styles.background}>
                <img
                    className={styles.backgroundImage1}
                    src={bg1}
                    alt="bg1"
                />
                <img
                    className={styles.backgroundImage2}
                    src={bg2}
                    alt="bg2"
                />
                <img
                    className={styles.backgroundImage3}
                    src={bg3}
                    alt="bg3"
                />
            </div>
        </div>
    );
};

export default AuthFormLayout;
