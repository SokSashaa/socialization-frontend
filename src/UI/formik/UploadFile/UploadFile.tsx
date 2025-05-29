import React, {FC} from 'react';
import clsx from 'clsx';
import {useField} from 'formik';

import styles from './UploadFile.module.css';

type UploadFileProps = {
	className: string;
	label: string;
	fileRef: React.MutableRefObject<null>;
	onChange?: () => void;
	inputProps: any; //Input attr
};
const UploadFile: FC<UploadFileProps> = ({className, label, fileRef, onChange, inputProps}) => {
	// const { className: inputClassName, ...otherProps } = inputProps;

	const [field, meta] = useField<HTMLInputElement>(inputProps.name);

	const {value, ...fieldProps} = field;

	return (
		<div className={className}>
			<button
				type="button"
				className={clsx(styles.button, className)}
				onClick={() => fileRef.current.click()}
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
			{meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
		</div>
	);
};

export default UploadFile;
