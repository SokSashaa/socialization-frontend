import React, { useCallback, useState } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const useUploadPhoto = (name: string) => {
  const [preview, setPreview] = useState<string|null>(null);

  const onUpload = useCallback(  ({ setFieldValue, touched, setTouched }) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];

      if (selectedFile) {
        setTouched({ ...touched, [name]: true });

        if (!ALLOWED_TYPES.includes(selectedFile.type) || selectedFile.size > MAX_FILE_SIZE) {
          return; //TODO: разобраться что делает
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
          setFieldValue(name, reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      }
    },[])

  const resetPreview = useCallback(()=> {
    setPreview(null)},[])

  return { preview, onUpload, resetPreview };
};

export default useUploadPhoto;
