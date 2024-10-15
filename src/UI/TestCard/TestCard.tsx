import clsx from 'clsx';
import styles from './TestCard.module.css';

const TestCard = ({ active, className, children }) => {
  const cardClasses = clsx(styles.card, className);
  const activeClasses = clsx({ [styles.active]: active });

  return (
    <div
      role="presentation"
      className={cardClasses}
    >
      <div className={activeClasses} />
      {children}
    </div>
  );
};

export default TestCard;
