import * as Yup from 'yup';

/**
 * Generates a Yup validation schema based on the provided fields.
 *
 * @param {Array} fields - An array of field objects.
 * @return {Object} - The generated Yup validation schema.
 */
// eslint-disable-next-line import/prefer-default-export
export const createValidationShema = (fields) => {
  const shape = {};

  fields.forEach((field) => {
    if (field.type === 'checkbox' && field.required) {
      shape[field.id] = Yup.array().min(1, 'Обязательный вопрос');
    } else if (field.type === 'checkbox' && !field.required) {
      shape[field.id] = Yup.array();
    } else if (field.required) {
      shape[field.id] = Yup.string().required('Обязательный вопрос');
    } else {
      shape[field.id] = Yup.string();
    }
  });

  return Yup.object().shape(shape);
};
