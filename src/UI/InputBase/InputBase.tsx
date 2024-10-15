import clsx from 'clsx';
import styles from './InputBase.module.css';

// обычный input, который не предназначен для formik
const InputBase = ({ className, inputProps }) => (
  <div className={clsx(styles.wrapper, className)}>
    <input
      // eslint-disable-next-line
      {...inputProps}
      className={clsx(styles.input, inputProps?.className)}
    />
  </div>
);

export default InputBase;
