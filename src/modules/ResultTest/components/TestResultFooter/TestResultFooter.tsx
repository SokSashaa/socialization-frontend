import { TestCard } from '../../../../UI';
import styles from './TestResultFooter.module.css';

const TestResultFooter = ({ test }) => {
  const pointTotal = test.questions.reduce((testTotal, question) => {
    const questionPointTotal = question.answer_user.reduce(
      (qTotal, answer) => qTotal + answer.point,
      0,
    );

    return questionPointTotal + testTotal;
  }, 0);

  const questionTotal = test.questions.length;

  return (
    <TestCard className={styles.card}>
      <div className={styles.content}>
        <p className={styles.text}>Количество вопросов:</p>
        <p className={styles.text}>{questionTotal}</p>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>Баллов за тест:</p>
        <p className={styles.text}>{pointTotal}</p>
      </div>
    </TestCard>
  );
};

export default TestResultFooter;
