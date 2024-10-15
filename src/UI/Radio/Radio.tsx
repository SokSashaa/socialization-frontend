import clsx from 'clsx';
import styles from './Radio.module.css';

const Radio = ({ className, label, labelClassName, alignLabel = 'left', radioProps }) => (
  <div className={clsx(styles.wrapper, className)}>
    <label className={clsx(styles.label, labelClassName)}>
      {alignLabel === 'left' && label}
      <input
        // eslint-disable-next-line
        {...radioProps}
        type="radio"
        className={clsx(styles.radio, radioProps?.className)}
      />
      {alignLabel === 'right' && label}
    </label>
  </div>
);

export default Radio;
