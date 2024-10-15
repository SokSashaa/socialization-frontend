import styles from './ButtonAddItemList.module.scss';
import { addFileIcon } from '../../assets';

const ButtonAddItemList = ({ onClick, children }) => (
  <button
    className={`group ${styles.button}`}
    onClick={onClick}
    type="button"
  >
    <img
      className={`group-hover:fill-white ${styles.icon}`}
      src={addFileIcon}
      alt="user"
    />
    {children}
  </button>
);

export default ButtonAddItemList;
