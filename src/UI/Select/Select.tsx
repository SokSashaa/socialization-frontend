import { useId } from 'react';
import clsx from 'clsx';
import styles from './Select.module.css';

const Select = ({ className, error, label, options, selectProps }) => {
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
        //   eslint-disable-next-line
        {...selectProps}
        id={id}
        className={clsx(styles.select, selectProps?.className)}
      >
        {options?.map((option, i) => (
          <option
            // eslint-disable-next-line
            key={i}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default Select;
