import {useState} from 'react';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const useUploadPhoto = (name: string) => {
	const [preview, setPreview] = useState<null | string>(null);

	const onUpload =
		({
			setFieldValue,
			touched,
			setTouched,
		}: {
			setFieldValue: (field: string, value: string | ArrayBuffer | null) => void;
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

				const reader = new FileReader();
				reader.onloadend = () => {
					if (typeof reader.result === 'string') {
						setPreview(reader.result);
					}
					setFieldValue(name, reader.result);
				};
				reader.readAsDataURL(selectedFile);
			}
		};

	const resetPreview = () => {
		setPreview(null);
	};

	return {preview, onUpload, resetPreview};
};

export default useUploadPhoto;
