import {FC, useId} from "react";
import Select from "react-select";
import css from './selectWithSearch.module.scss'
import {SelectProps} from "../Select/Select";
import clsx from "clsx";

type SelectWithSearchProps = SelectProps & {
    stylesForSearch?: object,
    onChange?: any,
}

const SelectWithSearch: FC<SelectWithSearchProps> = (props) => {

    const id = useId();

    return <div className={clsx(css.root,props.className)}>
        {props.label && <label id={id}>{props.label}</label>}

        <Select {...props.selectProps} id={id}
                styles={props.stylesForSearch}
                options={props.options}
                onChange={props.onChange}
                value={props.options ? props.options.find(option => option.value == props.selectProps.value) : ''}
        />

    </div>
}

export default SelectWithSearch
