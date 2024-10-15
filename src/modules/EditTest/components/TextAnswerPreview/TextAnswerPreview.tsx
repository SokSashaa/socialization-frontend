import styles from './TextAnswerPreview.module.css';

const TextAnswerPreview = () => (
  <input
    className={styles.answerText}
    type="text"
    disabled
    placeholder="Ответ"
    value=""
  />
);

export default TextAnswerPreview;
