import { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

const Button = forwardRef((props, ref) => {
  const { children, onClick, className, type = 'button', disabled = false } = props;

  const classes = clsx('bg-main-yellow', styles.button, className);

  return (
    <button
      ref={ref}
      className={classes}
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

export default Button;
