import {useRef, useState} from 'react';
import {AnimatePresence, m} from 'framer-motion';
import {toast} from 'react-toastify';
import {Form, Formik} from 'formik';
import {useAddUserMutation} from '../../api/usersApiSlice';
import {useUploadPhoto} from '../../../../hooks';

import NewUserFormStage1 from '../NewUserFormStage1/NewUserFormStage1';
import NewUserFormStage2 from '../NewUserFormStage2/NewUserFormStage2';
import {ROLES} from '../../../../utils/constants';
import {userPhotoSchema, userSchema} from '../../utils/validation.helper';
import {transformRolesToSelectOptions} from '../../utils/data.helper';
import {uploadedFileSchema} from '../../../../utils/helpers';
import styles from './NewUserForm.module.css';
import {useQuery} from "react-query";
import axios from "axios";

const variants = {
    initial: (direction) => ({
        opacity: 0,
        x: direction === 1 ? '-100%' : '100%',
    }),
    animate: {opacity: 1, x: 0, transition: {duration: 0.25}},
    exit: (direction) => ({
        opacity: 0,
        x: direction === 1 ? '100%' : '-100%',
        transition: {duration: 0.25},
    }),
};

const NewUserForm = () => {
    const fileRef = useRef(null);
    const [stage, setStage] = useState(1);
    const [addUser] = useAddUserMutation();

    const {preview, onUpload, resetPreview} = useUploadPhoto('photo');

    // const [getTutors, {isLoading: isLoadingTutors, isFetching: isFetchingTutors, data: tutors}] =
    //     useLazyGetTutorsQuery();
    const url = import.meta.env.VITE_SERVER_URL;
    const {data, isLoading, isError, isFetching, f} = useQuery('tutors', () => {
        return axios.get(url + 'users/get_tutors/').then(res => res.data.results)
    }, {cacheTime: 60000, staleTime: 60000})

    const organizations = useQuery('organizations', () => {
        return axios.get(url + 'organizations/').then(res => res.data.results)
    }, {cacheTime: 60000, staleTime: 60000})
    console.log('organizations',organizations.data)

    const initialValues = {
        name: '',
        second_name: '',
        patronymic: '',
        photo: '',
        birthday: '',
        email: '',
        organization: '',
        role: {
            code: ROLES.tutor.code,
            tutor_id: '1',
        },
        login: '',
        password: '',
    };
    console.log(initialValues)

    const validationSchema =
        stage === 1 ? userSchema : uploadedFileSchema(fileRef).concat(userPhotoSchema);

    const selectRoles = transformRolesToSelectOptions(ROLES);

    const onGoBack = () => {
        setStage(1);
    };

    const onSubmit = async (values, {setSubmitting, resetForm}) => {
        if (stage === 1) {
            setStage(2);

            setSubmitting(false);
        } else {
            try {
                const res = await addUser(values).unwrap();

                if (!res.success) {
                    if (res.errors.login) {
                        throw new Error('Такой логин уже существует');
                    } else throw new Error();
                }

                toast.success('Пользователь создан');
                resetForm({values: initialValues});
                resetPreview();
                onGoBack();
            } catch (error) {
                toast.error(error?.data?.detail || error.message || 'Что-то пошло не так');
            }
        }
    };

    const onRoleSelect =
        ({setFieldValue}) =>
            (e) => {
                const {value} = e.target;

                if (value === ROLES.observed.code) { //TODO: Разобарться с этим условием
                    setFieldValue('role.tutor_id', '');
                } else {
                    // getTutors();
                    // это для того, чтобы проходила валидация при добавлении наставника
                    // на бэке поле проигнорируется
                    setFieldValue('role.tutor_id', '1');
                }
            };

    const onOrganizationSelect = ({setFieldValue}) => (event) => {
        const {value} = event.target
        setFieldValue('organization', value)
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {(formikProps) => (
                <Form className={styles.form}>
                    <AnimatePresence
                        initial={false}
                        mode="wait"
                    >
                        {stage === 1 && (
                            <m.div
                                className={styles.inner}
                                key="stage1"
                                variants={variants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <NewUserFormStage1
                                    selectRoles={selectRoles}
                                    onRoleSelect={onRoleSelect}
                                    // isLoadingTutors={isLoadingTutors || isFetchingTutors}
                                    // tutors={tutors}
                                    isLoadingTutors={isLoading || isFetching}
                                    tutors={data}
                                    formikProps={formikProps}
                                    organizations={organizations.data}
                                    onOrganizationSelect={onOrganizationSelect}
                                />
                            </m.div>
                        )}

                        {stage === 2 && (
                            <m.div
                                className={styles.inner}
                                key="stage2"
                                variants={variants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <NewUserFormStage2
                                    formikProps={formikProps}
                                    onGoBack={onGoBack}
                                    fileRef={fileRef}
                                    preview={preview}
                                    onUpload={onUpload}
                                />
                            </m.div>
                        )}
                    </AnimatePresence>
                </Form>
            )}
        </Formik>
    );
};

export default NewUserForm;
