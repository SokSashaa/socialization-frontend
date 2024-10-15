import clsx from 'clsx';
import styles from './AddQuestionButton.module.css';

const AddQuestionButton = ({ onClick, className, children }) => {
  const classes = clsx(styles.button, className);

  return (
    <button
      type="button"
      className={classes}
      aria-label="Добавить вопрос"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default AddQuestionButton;
