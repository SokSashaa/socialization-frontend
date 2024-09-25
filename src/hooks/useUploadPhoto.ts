import React, { useState } from 'react';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const useUploadPhoto = (name: string) => {
  const [preview, setPreview] = useState<string|null>(null);

  const r = ['1','2','3']
  r
  const onUpload =
    ({ setFieldValue, touched, setTouched }) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
          setTouched({ ...touched, [name]: true });


          if (!ALLOWED_TYPES.includes(selectedFile.type) || selectedFile.size > MAX_FILE_SIZE) {
            return;
          }

          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result as string);
            setFieldValue(name, reader.result as string);
          };
          reader.readAsDataURL(selectedFile);
        }
      };

  const resetPreview = () => {
    setPreview(null);
  };

  return { preview, onUpload, resetPreview };
};

export default useUploadPhoto;
