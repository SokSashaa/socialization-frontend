import { Form } from 'formik';
import { Button, UploadFile, InputText, SpinnerMini } from '../../../../UI';
import { userIconV2Big } from '../../../../assets';
import { ROLES } from '../../../../utils/constants';
import styles from './ProfileInfoForm.module.css';

const inputFields = [
  {
    name: 'name',
    label: 'Имя *',
    type: 'text',
  },
  {
    name: 'second_name',
    label: 'Фамилия *',
    type: 'text',
  },
  {
    name: 'patronymic',
    label: 'Отчество (при наличии)',
    type: 'text',
  },
  {
    name: 'birthday',
    label: 'Дата рождения *',
    type: 'date',
  },
  {
    name: 'email',
    label: 'Email *',
    type: 'email',
  },
];

const ProfileInfoForm = ({ formikProps, preview, onUpload, onShowModal, fileRef, user }) => {
  const submitBtnContent = formikProps.isSubmitting ? <SpinnerMini /> : 'Сохранить';

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
        <div className={styles.saveButtonWrapper}>
          <Button
            className={styles.saveButton}
            type="submit"
            disabled={formikProps.isSubmitting}
          >
            {submitBtnContent}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default ProfileInfoForm;
