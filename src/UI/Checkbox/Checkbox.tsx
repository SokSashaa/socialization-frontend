import clsx from "clsx";
import styles from "./Checkbox.module.css";
import { FC } from "react";
import { FieldInputProps } from "formik";

export type CheckboxProps = {
  className: string,
  labelClassName?: string,
  label: string,
  checkboxProps: any //TODO разобраться с типом
  labelAlign?: string
}
const Checkbox: FC<CheckboxProps> = ({ className, labelClassName, label, checkboxProps, labelAlign = "right" }) => (
  <div className={className}>
    <label className={labelClassName}>
      {labelAlign === "left" && label}
      <input
        {...checkboxProps}
        type="checkbox"
        className={clsx(styles.checkbox, checkboxProps?.className)}
      />
      {labelAlign === "right" && label}
    </label>
  </div>
);

export default Checkbox;
