import { CSSProperties, FC } from 'react';
import clsx from 'clsx';

import { SpinnerDuration, SpinnerSize } from './types';

import css from './Spinner.module.scss';

interface SpinnerProps {
    size?: SpinnerSize;
    duration?: SpinnerDuration;
    className?: string;
    style?: CSSProperties;
}

const Spinner: FC<SpinnerProps> = ({
    className,
    style,
    size = SpinnerSize.MEDIUM,
    duration = SpinnerDuration.AVERAGE,
}) => {
    return (
        <div
            className={clsx(css.spinner, css[size], css[duration], className)}
            style={style}
        />
    );
};

export default Spinner;
