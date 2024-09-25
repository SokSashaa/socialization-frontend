import styles from './ModalLayout.module.scss';

const ModalLayout = ({ title, content }) => (
  <div className={styles.wrapper}>
    <div>
      <h3 className={styles.title}>{title}</h3>
      <div>{content}</div>
    </div>
  </div>
);

export default ModalLayout;
