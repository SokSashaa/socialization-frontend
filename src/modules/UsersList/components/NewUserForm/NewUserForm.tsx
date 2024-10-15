import { useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import { useAddUserMutation } from '../../api/usersApiSlice';
import { useLazyGetTutorsQuery } from '../../../../app/api/common/usersApiSlice';
import { useUploadPhoto } from '../../../../hooks';

import NewUserFormStage1 from '../NewUserFormStage1/NewUserFormStage1';
import NewUserFormStage2 from '../NewUserFormStage2/NewUserFormStage2';
import { ROLES } from '../../../../utils/constants';
import { userSchema, userPhotoSchema } from '../../utils/validation.helper';
import { transformRolesToSelectOptions } from '../../utils/data.helper';
import { uploadedFileSchema } from '../../../../utils/helpers';
import styles from './NewUserForm.module.css';

const variants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction === 1 ? '-100%' : '100%',
  }),
  animate: { opacity: 1, x: 0, transition: { duration: 0.25 } },
  exit: (direction) => ({
    opacity: 0,
    x: direction === 1 ? '100%' : '-100%',
    transition: { duration: 0.25 },
  }),
};

const NewUserForm = () => {
  const fileRef = useRef(null);
  const [stage, setStage] = useState(1);
  const [addUser] = useAddUserMutation();

  const { preview, onUpload, resetPreview } = useUploadPhoto('photo');

  const [getTutors, { isLoading: isLoadingTutors, isFetching: isFetchingTutors, data: tutors }] =
    useLazyGetTutorsQuery();

  const initialValues = {
    name: '',
    second_name: '',
    patronymic: '',
    photo: '',
    birthday: '',
    email: '',
    role: {
      code: ROLES.tutor.code,
      organization_id: 1,
      tutor_id: '1',
    },
    login: '',
    password: '',
  };

  const validationSchema =
    stage === 1 ? userSchema : uploadedFileSchema(fileRef).concat(userPhotoSchema);

  const selectRoles = transformRolesToSelectOptions(ROLES);

  const onGoBack = () => {
    setStage(1);
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
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
        resetForm({ values: initialValues });
        resetPreview();
        onGoBack();
      } catch (error) {
        toast.error(error?.data?.detail || error.message || 'Что-то пошло не так');
      }
    }
  };

  const onRoleSelect =
    ({ setFieldValue }) =>
    async (e) => {
      const { value } = e.target;

      if (value === ROLES.observed.code) {
        setFieldValue('role.tutor_id', '');
        await getTutors();
      } else {
        // это для того, чтобы проходила валидация при добавлении наставника
        // на бэке поле проигнорируется
        setFieldValue('role.tutor_id', '1');
      }
    };

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
                  isLoadingTutors={isLoadingTutors || isFetchingTutors}
                  tutors={tutors}
                  formikProps={formikProps}
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
