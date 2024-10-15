import { ErrorMessage, useFormikContext } from 'formik';
import clsx from 'clsx';
import ValidationErrorMessage from '../ValidationErrorMessage/ValidationErrorMessage';
import { TestCard, InputText, FormikCheckbox, FormikRadio } from '../../../../UI';
import styles from './QuestionItem.module.css';

const QuestionItem = ({ question }) => {
  const { errors, touched } = useFormikContext();

  const renderQuestionContent = (q) => {
    switch (q.type) {
      case 'text':
        return (
          <InputText
            type="text"
            name={`${q.id}`}
          />
        );

      case 'checkbox':
        return (
          <div className={styles.answers}>
            {q.answers.map((a) => (
              <FormikCheckbox
                className={styles.answer}
                key={a.id}
                label={a.text}
                alignLabel="right"
                checkboxProps={{
                  value: a.id,
                  name: `${q.id}`,
                }}
              />
            ))}
          </div>
        );

      case 'radio':
        return (
          <div className={styles.answers}>
            {q.answers.map((a) => (
              <FormikRadio
                alignLabel="right"
                className={styles.answer}
                key={a.id}
                label={a.text}
                radioProps={{
                  value: a.id,
                  name: `${q.id}`,
                }}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <TestCard
      className={clsx(styles.question, {
        [styles.error]: errors[question.id] && touched[question.id],
      })}
    >
      <h5 className={styles.title}>
        {question.title}
        {question.required && <span className="required"> *</span>}
      </h5>

      {renderQuestionContent(question)}
      {question.type !== 'text' && (
        <ErrorMessage
          name={`${question.id}`}
          component={ValidationErrorMessage}
          className={styles.error}
        />
      )}
    </TestCard>
  );
};

export default QuestionItem;
