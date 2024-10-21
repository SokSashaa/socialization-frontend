import {Button, UploadFile} from '../../../../UI';
import {userIconV2Big} from '../../../../assets';
import styles from './NewUserFormStage2.module.css';
import Spinner from "../../../../UI/spinners/Spinner";

const NewUserFormStage2 = ({formikProps, onGoBack, fileRef, preview, onUpload}) => {
    const submitBtnContent = formikProps.isSubmitting ? <Spinner typeSpinner={'mini'}/> : 'Добавить';

    return (
        <div className="flex h-full flex-col items-center justify-between">
            <div>
                {preview ? (
                    <div className={styles.avatarWrapper}>
                        <div className={styles.avatarContainer}>
                            <img
                                className={styles.avatar}
                                src={preview}
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
            </div>
            <div>
                <Button
                    onClick={onGoBack}
                    className={styles.saveButton}
                >
                    Назад
                </Button>
                <Button
                    type="submit"
                    className={styles.saveButton}
                >
                    {submitBtnContent}
                </Button>
            </div>
        </div>
    );
};

export default NewUserFormStage2;
