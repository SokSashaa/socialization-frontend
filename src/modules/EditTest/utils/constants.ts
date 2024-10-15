import { nanoid } from '@reduxjs/toolkit';

// eslint-disable-next-line import/prefer-default-export
export const INITIAL_QUESTION = {
  title: 'Вопрос',
  type: 'radio',
  answers: [
    {
      id: nanoid(),
      text: 'Ответ 1',
      point: 0,
    },
  ],
  required: false,
  open: false,
};
