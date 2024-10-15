import { FieldInputProps, useField } from "formik";
import Select from '../../Select/Select';
import { FC, useCallback } from "react";

type FormikSelectProps = {
  name: string,
  options?: any,
  className?: string,
  label?: string,
  onChange?: Function
  selectProps: HTMLInputElement
}
const FormikSelect:FC<FormikSelectProps> = ({ name, options, className, label, onChange, selectProps }) => {
  const [field] = useField<HTMLInputElement>(name);

  const fieldOnChange = useCallback((e) => {
    field.onChange(e);

    if (onChange) {
      onChange(e);
    }
  },[])

  return (
    <Select
      className={className}
      options={options}
      label={label}
      selectProps={{...selectProps, ...field}}
    />
  );
};

export default FormikSelect;
