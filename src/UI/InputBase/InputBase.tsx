import clsx from 'clsx';
import styles from './InputBase.module.css';
import { FC } from "react";

// обычный input, который не предназначен для formik
type InputBaseProps = {
  className?: string,
  inputProps?: HTMLInputElement
}
const InputBase:FC<InputBaseProps> = ({ className, inputProps }) => (
  <div className={className}>
    <input
      {...inputProps}
      className={clsx(styles.input, inputProps?.className)}
    />
  </div>
);

export default InputBase;
