import {Form} from 'formik';
import {Button, InputText, UploadFile} from '../../../../UI';
import {userIconV2Big} from '../../../../assets';
import {ROLES} from '../../../../utils/constants';
import styles from './ProfileInfoForm.module.css';
import css from './ProfileInfo.module.scss';
import Spinner from "../../../../UI/spinners/Spinner";
import {user_dto} from "../../../../dto/user.dto";
import {FC, MutableRefObject} from "react";
import {useAppSelector} from "../../../../hooks/redux";
import {useGetObservedsByTutorQuery, useGetTutorByObservedQuery} from "../../../../app/api/common/usersApiSlice";
import ItemUser from "./ItemUser/ItemUser";
import OrganizationsSelect from "../../../../components/OrganizationsSelect/OrganizationsSelect";
import RoleSelect from "../../../../components/RoleSelect/RoleSelect";


export type InputFieldType = {
    type: 'email' | 'date' | 'text' | 'select',
    name: string,
    label: string
}

type ProfileInfoFormPropsType = {
    formikProps: any,
    preview: string | null,
    onUpload: any,
    onShowModal: () => void,
    fileRef: MutableRefObject<null>,
    user: user_dto,
    inputFields: InputFieldType[]
}

const ProfileInfoForm: FC<ProfileInfoFormPropsType> = ({
                                                           formikProps,
                                                           preview,
                                                           onUpload,
                                                           onShowModal,
                                                           fileRef,
                                                           user,
                                                           inputFields
                                                       }) => {

    const submitBtnContent = formikProps.isSubmitting ? <Spinner typeSpinner={'mini'}/> : 'Сохранить';

    const optionSelect = [...Object.values(ROLES)].map((item) => {
        return {value: item.code, label: item.label}
    })

    const user_auth = useAppSelector((state) => state.auth)
    const {data: observeds} = useGetObservedsByTutorQuery({id: user.id})
    const {data: tutor} = useGetTutorByObservedQuery(user.id)

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
                {inputFields.map(({name, label, type}) => {
                    if (type === 'date' && user.role !== ROLES.observed.code) {
                        return null;
                    }
                    return (<InputText
                        key={name}
                        wrapperClassNames={styles.input}
                        label={label}
                        name={name}
                        type={type}
                    />)
                    // if (type === 'select') {
                    //     if (user_auth.user.role === ROLES.administrator.code) {
                    //         return <FormikSelect key={name} options={optionSelect}
                    //                              selectProps={{defaultValue: user.role}} name={'role'}/>
                    //     } else return null
                    //
                    // } else return (

                    // );
                })}
                <div className={css.container}>
                    <RoleSelect formikProps={formikProps} classNameError={css.selectError}/>
                    <OrganizationsSelect formikProps={formikProps}/>
                </div>

                <div className={styles.saveButtonWrapper}>
                    <Button
                        type="submit"
                        disabled={formikProps.isSubmitting}
                    >
                        {submitBtnContent}
                    </Button>
                </div>
                {
                    (user.role === ROLES.administrator.code || user.role === ROLES.tutor.code) && observeds && <>
                        {observeds.length < 1 && <h3 className={css.title}>Наблюдаемых нет</h3>}
                        {observeds.length > 0 && <>
                            <h3 className={css.title}>Назначенные наблюдаемые: </h3>
                            <div>{observeds.map(item => {

                                if (item) return <ItemUser key={item.id} user={item}/>
                                else return null
                            })}</div>
                        </>}
                    </>
                }
                {
                    tutor && user.role === ROLES.observed.code && <>
                        <h3 className={css.title}>Назначенный тьютор:</h3>
                        <ItemUser user={tutor}/>
                    </>
                }

            </div>
        </Form>
    );
};

export default ProfileInfoForm;
