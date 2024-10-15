import * as Yup from 'yup';
import { MAX_FILE_SIZE, ALLOWED_TYPES } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const uploadedFileSchema = (fileRef) =>
  Yup.object({
    photo: Yup.mixed()
      .test('fileType', 'Данный тип файла не поддерживается', () => {
        const value = fileRef.current?.files[0];

        if (value) {
          return ALLOWED_TYPES.includes(value.type);
        }

        return true;
      })
      .test('fileSize', 'Размер файла не должен превышать 5MB', () => {
        const value = fileRef.current?.files[0];

        if (value) {
          return value.size <= MAX_FILE_SIZE;
        }

        return true;
      }),
  });
