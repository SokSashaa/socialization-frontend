import clsx from 'clsx';
import styles from './Radio.module.css';
import { FC } from "react";
import { FieldInputProps } from "formik";

export type RadioProps = {
  className?: string,
  labelClassName?: string,
  alignLabel: string,
  radioProps: any // TODO разобраться с типом
}
const Radio: FC<RadioProps> = ({ className, label, labelClassName, alignLabel = 'left', radioProps }) => (
  <div className={className}>
    <label className={labelClassName}>
      {alignLabel === 'left' && label}
      <input
        {...radioProps}
        type="radio"
        className={clsx(styles.radio, radioProps?.className)}
      />
      {alignLabel === 'right' && label}
    </label>
  </div>
);

export default Radio;
