import clsx from 'clsx';
import styles from './InputBase.module.css';
import {FC, HTMLAttributes} from "react";

// обычный input, который не предназначен для formik
type InputBaseProps = {
  className?: string,
  inputProps?: HTMLAttributes<HTMLInputElement>
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
