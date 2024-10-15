import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import styles from './ValidationErrorMessage.module.css';

const ValidationErrorMessage = ({ children }) => (
  <div className={styles.wrapper}>
    <ExclamationCircleIcon className={styles.icon} />
    <p className={styles.text}>{children}</p>
  </div>
);

export default ValidationErrorMessage;
