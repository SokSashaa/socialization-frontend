import React, {FC} from 'react';
import clsx from 'clsx';
import {useField} from 'formik';

import {Tooltip} from '@UI/Tooltip/Tooltip';

import styles from './UploadFile.module.css';

type UploadFileProps = {
	className: string;
	label: string;
	fileRef: React.MutableRefObject<HTMLInputElement | null>;
	onChange?: () => void;
	inputProps: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> & {
		name: string;
	};
};
const UploadFile: FC<UploadFileProps> = ({className, label, fileRef, onChange, inputProps}) => {
	// const { className: inputClassName, ...otherProps } = inputProps;

	const [field, meta] = useField<HTMLInputElement>(inputProps.name);

	const {value, ...fieldProps} = field;

	return (
		<div className={clsx(className, styles.wrapper)}>
			<button
				type="button"
				className={clsx(styles.button, className)}
				onClick={() => fileRef.current?.click()}
			>
				{label || 'Выбрать файл'}
			</button>
			<input
				{...fieldProps}
				ref={fileRef}
				type="file"
				className={styles.input}
				onChange={onChange || inputProps.onChange}
			/>
			{meta.touched && meta.error && (
				<Tooltip
					content={
						<svg
							width="20px"
							height="20px"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M16 8L8 16M12 12L16 16M8 8L10 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
								stroke="red"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
						</svg>
					}
				>
					{meta.error}
				</Tooltip>
			)}
		</div>
	);
};

export default UploadFile;
