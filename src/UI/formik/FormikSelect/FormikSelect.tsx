import {useField} from "formik";
import Select from '../../Select/Select';
import {FC, HTMLAttributes} from "react";
import {SelectWithSearch} from "../../index";
import css from './formikSelect.module.scss'

type FormikSelectProps = {
    name: string,
    options?: any,
    className?: string,
    label?: string,
    onChange?: Function
    selectProps: any // по другому работать не будет //TODO подумать на счёт типа был htmlattributes<HTMLinput>,
    isWithFind?: boolean,
    stylesForSearch?: object,
}
const FormikSelect: FC<FormikSelectProps> = ({
                                                 name,
                                                 options,
                                                 className,
                                                 label,
                                                 isWithFind,
                                                 stylesForSearch,
                                                 onChange,
                                                 selectProps
                                             }) => {
    const [field, meta] = useField<any>(name); //TODO подумать на счёт типа

    // if(name==='role.tutor_id') console.log(meta)
    // const fieldOnChange = useCallback((e) => {
    //     field.onChange(e);
    //
    //     if (onChange) {
    //         onChange(e);
    //     }
    // }, [])

    const combineStylesForSearch = {...stylesForSearch,
        control: (base, state) => {
            const errorStyles = meta.error && field.value==='' ? {
                borderColor: '#ff0000',
                backgroundColor: 'rgba(255, 0, 0, 0.15)',
            } : {};

            return {
                ...stylesForSearch?.control(base, state),
                ...errorStyles,
            };
        },}



    return (<div className={css.root}>
            {
                isWithFind ?
                    <SelectWithSearch className={className} options={options} label={label} onChange={onChange}
                                      selectProps={{...selectProps, ...field,}} stylesForSearch={combineStylesForSearch}
                    /> :
                    <Select
                        className={className}
                        options={options}
                        label={label}
                        selectProps={{...selectProps, ...field}}
                    />
            }
            {/*{meta.error && field.value==='' && <span className={css.error}>{meta.error}</span>}*/}
        </div>
    );

};

export default FormikSelect;
