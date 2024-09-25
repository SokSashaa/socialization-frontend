import { useField } from "formik";
import Checkbox, { CheckboxProps } from "../../Checkbox/Checkbox";
import { FC } from "react";

const FormikCheckbox: FC<CheckboxProps> = ({
                                             className,
                                             label,
                                             labelClassName,
                                             labelAlign = "left",
                                             checkboxProps
                                           }) => {
  // const { className: checkboxClassName, ...otherProps } = checkboxProps;


  const [field] = useField<HTMLInputElement>(checkboxProps.name);

  return (
    <Checkbox
      label={label}
      labelAlign={labelAlign}
      labelClassName={labelClassName}
      className={className}
      checkboxProps={{
        ...field,
        ...checkboxProps,
        className
      }}
    />
  );
};

export default FormikCheckbox;
