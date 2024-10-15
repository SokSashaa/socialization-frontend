import { TestCard, Checkbox, Radio } from '../../../../UI';
import styles from './QuestionItem.module.css';

const QuestionItem = ({ question }) => {
  const qPointTotal = question.answer_user.reduce((qTotal, answer) => qTotal + answer.point, 0);

  const renderQuestionContent = (q) => {
    switch (q.type) {
      case 'checkbox':
        return (
          <div className={styles.answers}>
            {q.answers.map((a) => (
              <Checkbox
                className={styles.input}
                label={a.text}
                key={a.id}
                alignLabel="right"
                checkboxProps={{
                  readOnly: true,
                  checked: q.answer_user.some((aU) => aU.id === a.id),
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
              <Radio
                alignLabel="right"
                className={styles.input}
                key={a.id}
                label={a.text}
                radioProps={{
                  readOnly: true,
                  checked: q.answer_user.some((aU) => aU.id === a.id),
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
    <TestCard className={styles.question}>
      <h5 className={styles.title}>{question.title}</h5>

      {renderQuestionContent(question)}
      <span className={styles.points}>{`Получено баллов: ${qPointTotal}`}</span>
    </TestCard>
  );
};

export default QuestionItem;
