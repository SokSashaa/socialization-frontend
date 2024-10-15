import styles from "./ButtonAddItemList.module.scss";
import {addFileIcon} from "../../assets";
import React, {FC} from "react";

const ButtonAddItemList: FC<HTMLButtonElement> = (props) => (
    <button
        className={`group ${styles.button}`}
        onClick={props.click}
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
