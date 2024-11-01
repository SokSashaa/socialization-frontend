import clsx from 'clsx';
import styles from './AddQuestionButton.module.css';
import {FC, ReactNode} from "react";

type AddQuestionButtonProps = {
  onClick?: ()=>void,
  className?: string,
  children?: ReactNode
}
const AddQuestionButton:FC<AddQuestionButtonProps> = ({ onClick, className, children }) => {
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
