import { spinner } from "../../assets";
import styles from "./spinner.module.css";
import { FC } from "react";
import clsx from "clsx";

type SpinnerProps = {
  className: string,
  typeSpinner: "mini" | "big"
}
const Spinner: FC<SpinnerProps> = ({ className, typeSpinner }) => (
  <img
    className={clsx(typeSpinner === "mini" ? styles.spinnerMini : styles.spinnerBig, className)}
    src={spinner}
    alt="spinner"
  />
);

export default Spinner;
