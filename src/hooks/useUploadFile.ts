import {useState} from 'react';

const MAX_FILE_SIZE = 150 * 1024 * 1024;
const ALLOWED_TYPES = ['.zip'];

const useUploadFile = (name) => {
	const [preview, setPreview] = useState<null | string>(null);

	const onUpload =
		({setFieldValue, touched, setTouched}) =>
		(e) => {
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

export default useUploadFile;
