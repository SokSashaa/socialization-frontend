import { spinner } from '../../../assets';
import styles from './SpinnerMini.module.css';

const SpinnerMini = ({ className }) => (
  <img
    className={`${styles.spinner} ${className}`}
    src={spinner}
    alt="spinner"
  />
);

export default SpinnerMini;
