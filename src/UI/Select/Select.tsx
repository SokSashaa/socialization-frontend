import {FC, HTMLAttributes, useId} from "react";
import clsx from 'clsx';
import styles from './Select.module.css';
import { FieldInputProps } from "formik";

export type SelectProps = {
  className?: string,
  error?: string,
  label?: string,
  options?: any, //Partial<HTMLOptionElement>[], // мне не нравится, но по другому вообще ниче не работает
  selectProps?: any // TODO разобраться с типом
}
const Select:FC<SelectProps> = ({ className, error, label, options, selectProps }) => {
  const id = useId();
  // console.log(selectProps)

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
