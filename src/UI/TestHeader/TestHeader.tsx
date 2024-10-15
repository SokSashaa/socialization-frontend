import TestCard from '../TestCard/TestCard';
import styles from './TestHeader.module.css';

const TestHeader = ({ title, description }) => (
  <TestCard className={styles.top}>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.description}>{description}</p>
  </TestCard>
);

export default TestHeader;
