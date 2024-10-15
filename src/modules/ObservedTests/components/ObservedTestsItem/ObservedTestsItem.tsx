import { Link } from 'react-router-dom';
import { ItemListWrapper } from '../../../../UI';
import { convertDate } from '../../../../utils/helpers';
import styles from './ObservedTestsItem.module.scss';

const ObservedTestsItem = ({ test, userId }) => (
  <ItemListWrapper>
    <div className={styles.info}>
      <h3 className={styles.title}>{`${test.title} (${convertDate(test.created_at)})`}</h3>
      <p className={styles.description}>{test.description}</p>
    </div>
    {test.is_passed && (
      <Link
        className={styles.button}
        to={`/tests/${test.id}/result`}
        state={{ userId }}
      >
        Посмотреть результат
      </Link>
    )}
  </ItemListWrapper>
);

export default ObservedTestsItem;
