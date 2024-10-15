import { useField } from 'formik';
import clsx from 'clsx';
import styles from './UploadFile.module.css';

const UploadFile = ({ className, label, fileRef, onChange, inputProps }) => {
  const { className: inputClassName, ...otherProps } = inputProps;

  const [field, meta] = useField(otherProps);

  const { value, ...fieldProps } = field;

  return (
    <div className={clsx(styles.wrapper, className)}>
      <button
        type="button"
        onClick={() => fileRef.current.click()}
        className={clsx(styles.button, inputClassName)}
      >
        {label || 'Выбрать файл'}
      </button>
      <input
        /* eslint-disable */
        {...fieldProps}
        {...otherProps}
        /* eslint-enable */
        ref={fileRef}
        type="file"
        onChange={onChange}
        className={styles.input}
      />
      {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
    </div>
  );
};

export default UploadFile;
