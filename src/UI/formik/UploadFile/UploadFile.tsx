import { useField } from 'formik';
import clsx from 'clsx';
import styles from './UploadFile.module.css';
import React, { FC } from "react";

type UploadFileProps = {
  className: string,
  label: string,
  fileRef: React.MutableRefObject<null>,
  onChange: ()=>void,
  inputProps: HTMLInputElement
}
const UploadFile: FC<UploadFileProps> = ({ className, label, fileRef, onChange, inputProps }) => {
  // const { className: inputClassName, ...otherProps } = inputProps;

  const [field, meta] = useField<HTMLInputElement>(inputProps.name);

  const { value, ...fieldProps } = field;

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => fileRef.current.click()}
        className={clsx(styles.button, className)}
      >
        {label || 'Выбрать файл'}
      </button>
      <input
        {...fieldProps}
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
