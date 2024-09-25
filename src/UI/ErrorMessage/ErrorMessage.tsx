import clsx from 'clsx';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import styles from './ErrorMessage.module.css';
import { FC } from "react";

type ErrorMessageProps = {
  message: string,
  className: string
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message, className }) => (
  <div className={clsx(styles.wrapper, className)}>
    <ExclamationTriangleIcon className={styles.icon} />
    <p className={styles.text}>{message ?? 'Неизвестная ошибка'}</p>
  </div>
);

export default ErrorMessage;
