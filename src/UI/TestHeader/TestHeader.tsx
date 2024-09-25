import styles from './TestHeader.module.css';
import { FC } from "react";
import TestCard from '../TestCard/TestCard'

type TestHeaderProps = {
  title: string,
  description: string
}
const TestHeader:FC<TestHeaderProps> = ({ title, description }) => (
  <TestCard className={styles.top}>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.description}>{description}</p>
  </TestCard>
);

export default TestHeader;
