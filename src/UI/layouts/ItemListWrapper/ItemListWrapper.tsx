import styles from './ItemListWrapper.module.scss';

const ItemListWrapper = ({ children }) => (
  <div className={styles.wrapper}>
    <div className={styles.content}>{children}</div>
  </div>
);

export default ItemListWrapper;
