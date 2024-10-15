import clsx from "clsx";
import styles from "./TestCard.module.css";
import { FC, ReactNode } from "react";

type TestCardProps = {
  active?: boolean,
  className?: string,
  children: ReactNode
}
const TestCard:FC<TestCardProps> = ({ active, className, children }) => {
  return (
    <div
      role="presentation"
      className={clsx(styles.card, className)}
    >
      <div className={clsx({ [styles.active]: active })} />
      {children}
    </div>
  );
};

export default TestCard;
