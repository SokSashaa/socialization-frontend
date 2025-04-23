import { FC } from 'react';
import clsx from 'clsx';

import { IconListSizes } from './types';

import css from './IconList.module.scss';

interface IconListProps {
    id: string;
    defaultPhoto: string;
    photo?: string | null;
    size?: IconListSizes;
}

const IconList: FC<IconListProps> = ({ id, photo, defaultPhoto, size = IconListSizes.MEDIUM }) => {
    return (
        <>
            {photo ? (
                <div
                    key={`photo_div_${id}`}
                    className={clsx(css.imageWrapper, css[size])}
                >
                    <img
                        className={css.image}
                        src={photo}
                        alt="user"
                    />
                </div>
            ) : (
                <img
                    key={`photo_img_${id}`}
                    src={defaultPhoto}
                    alt="user"
                />
            )}
        </>
    );
};

export default IconList;
