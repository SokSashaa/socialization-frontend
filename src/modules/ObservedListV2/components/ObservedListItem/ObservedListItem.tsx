import { userIconV2 } from '../../../../assets';
import styles from './ObservedListItem.module.css';

const ObservedListItem = ({ observed }) => {
  const { name, photo, patronymic, second_name: secondName } = observed;

  return (
    <div className={styles.wrapper}>
      {photo ? (
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={photo}
            alt="user"
          />
        </div>
      ) : (
        <img
          src={userIconV2}
          alt="user"
        />
      )}
      <div className={styles.info}>
        <h2 className={styles.name}>{`${secondName} ${name} ${patronymic || ''}`}</h2>
      </div>
    </div>
  );
};

export default ObservedListItem;
