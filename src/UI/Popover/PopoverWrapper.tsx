import { FC, LegacyRef, ReactNode, useMemo, useRef } from 'react';
import cn from 'clsx';

import { PopoverPosition, PopoverSide } from './types';

import css from './Popover.module.scss';

export interface PopoverWrapperProps {
    isOpen: boolean;
    anchorElement: HTMLElement | null;
    children: ReactNode;
    className?: string;
    ref?: LegacyRef<HTMLDivElement>;
    position?: PopoverPosition;
    side?: PopoverSide;
}

const PopoverWrapper: FC<PopoverWrapperProps> = ({
    position = PopoverPosition.CENTER,
    side = PopoverSide.BOTTOM,
    ...props
}) => {
    const popoverRef = useRef<HTMLDivElement>(null);

    const anchorElementSizes = useMemo(() => {
        if (props.anchorElement) {
            const { height, width } = props.anchorElement.getBoundingClientRect();

            return [height, width];
        }

        return [0, 0];
    }, [props.anchorElement]);

    return (
        <div
            ref={props.ref}
            className={css.root}
        >
            <div
                ref={popoverRef}
                style={{
                    '--sizeH': anchorElementSizes[0] + 'px',
                    '--sizeW': anchorElementSizes[1] + 'px',
                }}
                className={cn(
                    css.body,
                    css[position],
                    css[side],
                    props.className,
                    props.isOpen && css.active,
                )}
            >
                {props.children}
            </div>
        </div>
    );
};

export default PopoverWrapper;
