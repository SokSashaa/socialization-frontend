import { nanoid } from '@reduxjs/toolkit';
import { useFormikContext } from 'formik';

import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { TestCard } from '../../../../UI';
import QuestionEdit from '../QuestionEdit/QuestionEdit';
import QuestionPreview from '../QuestionPreview/QuestionPreview';
import AddQuestionButton from '../AddQuestionButton/AddQuestionButton';

import { onFieldArrayControl } from '../../utils/form.helper';
import { INITIAL_QUESTION } from '../../utils/constants';
import styles from './QuestionCard.module.css';

const QuestionCard = ({ question, qIndex, arrayHelpers }) => {
  const { setFieldValue, values } = useFormikContext();

  const onSetActive = (activeIndex) => () => {
    if (!values.questions[activeIndex].open) {
      values.questions.map((_, index) => setFieldValue(`questions[${index}].open`, false));

      setFieldValue(`questions[${activeIndex}].open`, true);
    }
  };

  return (
    <div
      className={styles.wrapper}
      role="presentation"
      onClick={onSetActive(qIndex)}
    >
      <TestCard active={question.open}>
        {question.open ? (
          <QuestionEdit
            question={question}
            qIndex={qIndex}
            arrayHelpers={arrayHelpers}
          />
        ) : (
          <QuestionPreview question={question} />
        )}
      </TestCard>
      {question.open && (
        <AddQuestionButton
          className={styles.addButton}
          onClick={onFieldArrayControl(arrayHelpers.insert, qIndex + 1, {
            id: nanoid(),
            ...INITIAL_QUESTION,
          })}
        >
          <PlusCircleIcon className={`icon ${styles.addIcon}`} />
        </AddQuestionButton>
      )}
    </div>
  );
};

export default QuestionCard;
