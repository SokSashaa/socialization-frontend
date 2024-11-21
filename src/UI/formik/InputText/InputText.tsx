import {FC, HTMLAttributes, useId} from "react";
import { useField } from 'formik';
import clsx from 'clsx';
import styles from './InputText.module.scss';

// TODO: сделать универсальный input и обернуть в отдельном компоненте в formik

// input, предназначенный для formik

type InputTextProps =  HTMLAttributes<HTMLInputElement> & {
  rightIcon?:  any, //any не нужен
  wrapperClassNames?: string
  label?: string,
  as?: string,
  maxlength?: number
}
const InputText: FC<InputTextProps> = (props) => {
  const {
    name,
    rightIcon,
    wrapperClassNames,
    className,
    label,
    as = 'input',
    maxlength = { Infinity },
    ...inputProps
  } = props;

  const [field, meta] = useField(name);

  const hasErrors = meta.touched && meta.error;

  const inputClasses = clsx(
    styles.input,
    { 'pr-10': rightIcon },
    { 'border-[#ff0000] bg-[#ff0000]/15': hasErrors },
    className,
  );

  const id = useId();

  const Component = as;

  return (
    <div
      className={clsx(styles.wrapper, wrapperClassNames)}
      role="presentation"
    >
      {label && (
        <label
          htmlFor={id}
          className={styles.label}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <Component
          {...field}
          {...inputProps}
          id={id}
          className={inputClasses}
          aria-label={name}
          tabIndex={0}
          maxLength={maxlength}
        />
        {rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>}
      </div>

      {hasErrors && <span className={styles.error}>{meta.error}</span>}
    </div>
  );
};

export default InputText;
