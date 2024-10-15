import clsx from 'clsx';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message, className }) => (
  <div className={clsx(styles.wrapper, className)}>
    <ExclamationTriangleIcon className={styles.icon} />
    <p className={styles.text}>{message ?? 'Неизвестная ошибка'}</p>
  </div>
);

export default ErrorMessage;
