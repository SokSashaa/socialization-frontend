import styles from './TestResultBody.module.css';

const TestResultBody = ({ test }) => (
  <div className={styles.content}>
    <h3 className={styles.title}>Тест пройден</h3>
    <p className={styles.text}>Ваш результат: 100% гей</p>
  </div>
);

export default TestResultBody;
