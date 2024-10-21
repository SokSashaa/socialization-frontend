import styles from "./ButtonAddItemList.module.scss";
import {addFileIcon} from "../../assets";
import React, {FC, HTMLAttributes} from "react";

const ButtonAddItemList: FC<HTMLAttributes<HTMLButtonElement>> = (props) => (
    <button
        className={`group ${styles.button}`}
        onClick={props.onClick}
        type="button"
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
