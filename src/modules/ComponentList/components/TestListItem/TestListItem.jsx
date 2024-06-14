import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { selectCurrentUser } from '../../../Auth';
import { setSelectedTest } from '../../slice/testsSlice';
import { useDeleteTestMutation } from '../../api/testApiSlice';
import { convertDate } from '../../../../utils/helpers';
import { ROLES } from '../../../../utils/constants';
import styles from './TestListItem.module.scss';

const TestListItem = ({ test, toggleModal }) => {
  const [deleteTest] = useDeleteTestMutation();

  const { role } = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  const onSelectTest = (id) => () => {
    dispatch(setSelectedTest(id));
    toggleModal();
  };

  const onDelete = (id) => async () => {
    const toastId = toast.loading('Удаление теста...');

    try {
      await deleteTest(id).unwrap();

      toast.update(toastId, {
        render: 'Тест удален',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: 'Произошла ошибка при удалении теста',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const renderTestButtons = (userRole) => {
    switch (userRole) {
      case ROLES.Admin:
        return (
          <>
            <button
              className={styles.button}
              type="button"
              onClick={onSelectTest(test.id)}
            >
              Назначить
            </button>
            <Link
              className={styles.button}
              to={`/tests/${test.id}/edit`}
            >
              Редактировать
            </Link>
            <button
              className={styles.close}
              type="button"
              aria-label="Удалить тест"
              onClick={onDelete(test.id)}
            >
              <XCircleIcon className={styles.icon} />
            </button>
          </>
        );
      case ROLES.Tutor:
        return (
          <>
            <button
              className={styles.button}
              type="button"
              onClick={onSelectTest(test.id)}
            >
              Назначить
            </button>
            <Link
              className={styles.button}
              to={`/tests/${test.id}/edit`}
            >
              Редактировать
            </Link>
          </>
        );
      case ROLES.Observed:
        return (
          <Link
            className={styles.button}
            to={`/tests/${test.id}/pass`}
          >
            Пройти
          </Link>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.info}>
          <h3 className={styles.title}>{`${test.title} (${convertDate(test.created_at)})`}</h3>
          <p className={styles.description}>{test.description}</p>
        </div>
        <div className={styles.buttons}>{renderTestButtons(role)}</div>
      </div>
    </div>
  );
};

export default TestListItem;
