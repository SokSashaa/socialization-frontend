import { useGetObserverTestsQuery } from '../../../../app/api/common/testApiSlice';
import { Container, SpinnerBig, ErrorMessage } from '../../../../UI';
import ObservedTestsItem from '../ObservedTestsItem/ObservedTestsItem';
import styles from './ObservedTests.module.css';

const ObservedTests = ({ userId }) => {
  const { data: tests, isLoading, isError, isFetching } = useGetObserverTestsQuery({ id: userId });

  if (isLoading || isFetching) {
    return <SpinnerBig className="mt-7" />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message="Ошибка загрузки тестов"
        className="mt-7"
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.inner}>
          <h2 className={styles.title}>Назначенные тесты</h2>
          <ul className={styles.list}>
            {tests.map((test) => (
              <li
                className={styles.listItem}
                key={test.id}
              >
                <ObservedTestsItem
                  test={test}
                  userId={userId}
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default ObservedTests;
