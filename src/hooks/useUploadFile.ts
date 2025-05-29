import {useState} from 'react';

const MAX_FILE_SIZE = 150 * 1024 * 1024;
const ALLOWED_TYPES = ['application/x-zip-compressed'];

const useUploadFile = (name: string) => {
	const [preview, setPreview] = useState<null | File>(null);

	const onUpload =
		({
			setFieldValue,
			touched,
			setTouched,
		}: {
			setFieldValue: (field: string, value: File) => void;
			touched: Record<string, boolean>;
			setTouched: (touched: Record<string, boolean>) => void;
		}) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (e.target.files === null) {
				return;
			}

			const selectedFile = e.target.files[0];

			if (selectedFile) {
				setTouched({...touched, [name]: true});

				if (
					!ALLOWED_TYPES.includes(selectedFile.type) ||
					selectedFile.size > MAX_FILE_SIZE
				) {
					return;
				}
				setPreview(selectedFile);
				setFieldValue(name, selectedFile);
			}
		};

	const resetPreview = () => {
		setPreview(null);
	};

	return {preview, onUpload, resetPreview};
};

export default useUploadFile;
