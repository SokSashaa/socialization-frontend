import {FC, InputHTMLAttributes} from 'react';
import React from 'react';
import clsx from 'clsx';

import styles from './Checkbox.module.css';

export type CheckboxProps = {
	label: string;
	checkboxProps: CheckboxInputProps;
	labelAlign?: 'left' | 'right';
} & StyleProps;

type CheckboxInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

type StyleProps = {
	className?: string;
	labelClassName?: string;
};
const Checkbox: FC<CheckboxProps> = ({
	className,
	labelClassName,
	label,
	checkboxProps,
	labelAlign = 'right',
}) => (
	<div className={className}>
		<label className={labelClassName}>
			{labelAlign === 'left' && label}
			<input
				{...checkboxProps}
				type="checkbox"
				className={clsx(styles.checkbox, checkboxProps?.className)}
			/>
			{labelAlign === 'right' && label}
		</label>
	</div>
);

export default Checkbox;
