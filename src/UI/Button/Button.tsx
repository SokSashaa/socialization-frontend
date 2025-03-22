import {forwardRef, HTMLAttributes} from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
                                                                  children,
                                                                  onClick,
                                                                  className,
                                                                  type,
                                                                  disabled
                                                              }, ref) => {

    const classes = clsx("bg-main-yellow", styles.button, className);
    return (
        <button
            ref={ref}
            className={classes}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
});

export default Button;
