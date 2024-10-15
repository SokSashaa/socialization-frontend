import clsx from 'clsx';
import { spinner } from '../../../assets';
import styles from './SpinnerBig.module.css';

const SpinnerBig = ({ className }) => (
  <img
    className={clsx(styles.spinner, className)}
    src={spinner}
    alt="spinner"
  />
);

export default SpinnerBig;
