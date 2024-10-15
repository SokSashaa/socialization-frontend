import {forwardRef} from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";

const Button = forwardRef<HTMLButtonElement>(({
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
