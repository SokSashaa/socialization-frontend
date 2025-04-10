import React, { FC, HTMLAttributes } from 'react';

import { addFileIcon } from '@assets/index';

import styles from './ButtonAddItemList.module.scss';

const ButtonAddItemList: FC<HTMLAttributes<HTMLButtonElement>> = (props) => (
    <button
        className={`group ${styles.button}`}
        type="button"
        onClick={props.onClick}
    >
        <img
            className={`group-hover:fill-white ${styles.icon}`}
            src={addFileIcon}
            alt="user"
        />
        {props.children}
    </button>
);

export default ButtonAddItemList;
