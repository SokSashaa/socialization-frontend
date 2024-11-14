import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {Formik} from 'formik';
import {toast} from 'react-toastify';
import {useMediaQuery} from 'react-responsive';
import {useLoginMutation} from '../../api/authApiSlice';
import {useLazyGetUserInfoQuery} from '../../../../app/api/common/usersApiSlice';
import {setToken, setUserCredentials} from '../../slice/authSlice';
import {authSchema} from '../../utils/validation.helper';
import AuthFormLayout from '../AuthFormLayout/AuthFormLayout';

const DEFAULT_PATH = '/';

const AuthForm = () => {
    const initialState = {
        login: '',
        password: '',
    };

    const [showPassword, setShowPassword] = useState(false);

    const isMobile = useMediaQuery({query: '(max-width: 640px)'});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const from = location.state?.from?.pathname || DEFAULT_PATH;

    const [login] = useLoginMutation();
    const [getUserInfo] = useLazyGetUserInfoQuery();


    const onSubmit = async (values, {resetForm}) => {
        try {
            const tokenData = await login(values).unwrap();
            dispatch(setToken({...tokenData}));

            const user = await getUserInfo().unwrap();
            dispatch(setUserCredentials(user));

            resetForm({values: initialState});
            navigate(from, {replace: true});
        } catch (error) {
            toast.error('Неверный логин или пароль');
        }
    };

    return (
        <Formik
            initialValues={initialState}
            validationSchema={authSchema}
            onSubmit={onSubmit}
        >
            {(formikProps) => (
                <AuthFormLayout
                    isMobile={isMobile}
                    onShowPassword={() => setShowPassword((prev) => !prev)}
                    showPassword={showPassword}
                    formikProps={formikProps}
                />
            )}
        </Formik>
    );
};

export default AuthForm;
