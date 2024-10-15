import styles from './ModalLayout.module.scss';

const ModalLayout = ({ title, content }) => (
  <div className={styles.wrapper}>
    <div className={styles.content}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.body}>{content}</div>
    </div>
  </div>
);

export default ModalLayout;
