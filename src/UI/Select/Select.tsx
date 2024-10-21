import {FC, HTMLAttributes, useId} from "react";
import clsx from 'clsx';
import styles from './Select.module.css';
import { FieldInputProps } from "formik";

type SelectProps = {
  className?: string,
  error?: string,
  label?: string,
  options?: HTMLAttributes<HTMLOptionElement>[],
  selectProps: any // TODO разобраться с типом
}
const Select:FC<SelectProps> = ({ className, error, label, options, selectProps }) => {
  const id = useId();

  return (
    <div className={clsx(styles.wrapper, className)}>
      {label && (
        <label
          htmlFor={id}
          className={styles.label}
        >
          {label}
        </label>
      )}

      <select
        {...selectProps}
        id={id}
        className={clsx(styles.select, selectProps?.className)}
      >
        {options?.map((option, i) => (
          <option
            key={i}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && <span>{error}</span>}
    </div>
  );
};

export default Select;
