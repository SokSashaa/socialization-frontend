import { useField } from 'formik';
import Checkbox from '../../Checkbox/Checkbox';

const FormikCheckbox = ({
  className,
  label,
  labelClassName,
  alignLabel = 'left',
  checkboxProps,
}) => {
  const { className: checkboxClassName, ...otherProps } = checkboxProps;

  const [field] = useField(otherProps);

  return (
    <Checkbox
      label={label}
      labelAlign={alignLabel}
      labelClassName={labelClassName}
      className={className}
      checkboxProps={{
        ...field,
        ...checkboxProps,
        className: checkboxClassName,
      }}
    />
  );
};

export default FormikCheckbox;
