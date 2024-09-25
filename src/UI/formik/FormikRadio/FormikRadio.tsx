import { FieldInputProps, useField } from "formik";
import Radio, { RadioProps } from "../../Radio/Radio";
import { FC } from "react";


type FormikRadioProps =  {
  className?: string,
  labelClassName?: string,
  alignLabel?: string,
  radioProps: HTMLInputElement
}
const FormikRadio: FC<FormikRadioProps> = ({ className, label, labelClassName, alignLabel = 'left', radioProps }) => {
  // const { className: radioClassName, ...otherProps } = radioProps;

  const [field] = useField<HTMLInputElement>(radioProps.name);

  return (
    <Radio
      label={label}
      alignLabel={alignLabel}
      labelClassName={labelClassName}
      className={className}
      radioProps={{
        ...field,
        ...radioProps,
        className,
      }}
    />
  );
};

export default FormikRadio;
