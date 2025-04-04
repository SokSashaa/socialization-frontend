import { Form } from 'formik';
import { Button, InputText, UploadFile } from '../../../../UI';
import { userIconV2Big } from '../../../../assets';
import { ROLES } from '../../../../utils/constants';
import styles from './ProfileInfoForm.module.css';
import css from './ProfileInfo.module.scss';
import Spinner from '../../../../UI/spinners/Spinner';
import { user_dto } from '../../../../dto/user.dto';
import { FC, MutableRefObject, ReactNode } from 'react';
import { useAppSelector } from '../../../../hooks/redux';
import ObservedList from '../ObservedList/ObservedList';
import AppointedTutor from '../AppointedTutor/AppointedTutor';

export type InputFieldType = {
    type: 'email' | 'date' | 'text' | 'select';
    name: string;
    label: string;
};

interface ProfileInfoFormPropsType {
    formikProps: any;
    preview: string | null;
    onUpload: any;
    onShowModal: () => void;
    fileRef: MutableRefObject<null>;
    user: user_dto;
    inputFields: InputFieldType[];
    children?: ReactNode;
}

const ProfileInfoForm: FC<ProfileInfoFormPropsType> = ({
    formikProps,
    preview,
    onUpload,
    onShowModal,
    fileRef,
    user,
    inputFields,
    children,
}) => {
    const submitBtnContent = formikProps.isSubmitting ? (
        <Spinner typeSpinner={'mini'} />
    ) : (
        'Сохранить'
    );

    return (
        <Form
            method="post"
            className={styles.form}
        >
            <div className={styles.left}>
                {preview || user?.photo ? (
                    <div className={styles.avatarWrapper}>
                        <div className={styles.avatarContainer}>
                            <img
                                className={styles.avatar}
                                src={preview || user?.photo}
                                alt="avatar"
                            />
                        </div>
                    </div>
                ) : (
                    <img
                        className={styles.defaultAvatar}
                        src={userIconV2Big}
                        alt="avatar"
                    />
                )}

                <div className={styles.leftButtonsContainer}>
                    <UploadFile
                        fileRef={fileRef}
                        label="Изменить фото"
                        className={styles.upload}
                        onChange={onUpload(formikProps)}
                        inputProps={{
                            name: 'photo',
                            accept: 'image/png, image/jpeg, image/jpg',
                        }}
                    />
                    <Button
                        className={styles.changePaswordButton}
                        onClick={onShowModal}
                    >
                        Сменить пароль
                    </Button>
                </div>
            </div>
            <div className={styles.right}>
                {inputFields.map(({ name, label, type }) => {
                    if (type === 'date' && user.role !== ROLES.observed.code) {
                        return null;
                    }
                    return (
                        <InputText
                            key={name}
                            wrapperClassNames={styles.input}
                            label={label}
                            name={name}
                            type={type}
                        />
                    );
                })}
                {children && <div className={css.container}>{children}</div>}

                <div className={styles.saveButtonWrapper}>
                    <Button
                        type="submit"
                        disabled={formikProps.isSubmitting}
                    >
                        {submitBtnContent}
                    </Button>
                </div>
                {user.role !== ROLES.observed.code && <ObservedList user_id={user.id} />}
                {user.role === ROLES.observed.code && <AppointedTutor user_id={user.id} />}
            </div>
        </Form>
    );
};

export default ProfileInfoForm;
