import TextAnswerPreview from '../TextAnswerPreview/TextAnswerPreview';
import styles from './QuestionPreview.module.css';

const QuestionPreview = ({ question }) => {
  const renderQuestionContent = (q) => {
    const { type, answers } = q;

    switch (type) {
      case 'text':
        return <TextAnswerPreview />;
      case 'radio':
      case 'checkbox': {
        const answersElements = answers.map((answer) => (
          <label
            key={answer.id}
            htmlFor={`answer-key-${answer.id}`}
            className="cursor-pointer"
          >
            <input
              className={styles.answerItem}
              type={type}
              id={`answer-key-${answer.id}`}
              disabled
            />
            {answer.text}
          </label>
        ));

        return <div className={styles.answers}>{answersElements}</div>;
      }
      default:
        return null;
    }
  };

  return (
    <div className={styles.wrapper}>
      <h5 className={styles.title}>
        {question.title}
        {question.required && <span className="required"> *</span>}
      </h5>
      {renderQuestionContent(question)}
    </div>
  );
};

export default QuestionPreview;
