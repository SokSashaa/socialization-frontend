import React, {FC, useId} from 'react';
import Select from 'react-select';
import clsx from 'clsx';

import {SelectProps} from '../Select/Select';

import css from './selectWithSearch.module.scss';

type SelectWithSearchProps = SelectProps & {
	stylesForSearch?: object;
	onChange?: any;
	onInputChange?: (value: string) => void;
};

const SelectWithSearch: FC<SelectWithSearchProps> = (props) => {
	const id = useId();

	return (
		<div className={clsx(css.root, props.className)}>
			{props.label && <label id={id}>{props.label}</label>}

			<Select
				{...props.selectProps}
				id={id}
				styles={props.stylesForSearch}
				options={props.options}
				menuPlacement={'auto'}
				value={
					props.options
						? props.options.find((option) => option.value == props.selectProps.value)
						: ''
				}
				onChange={props.onChange}
				onInputChange={props.onInputChange}
			/>
		</div>
	);
};

export default SelectWithSearch;
