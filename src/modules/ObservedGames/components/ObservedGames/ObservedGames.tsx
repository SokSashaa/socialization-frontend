import { useGetObserverGamesQuery } from '../../../../app/api/common/gameApiSlice';
import { Container, ErrorMessage, SpinnerBig } from '../../../../UI';
import ObservedGamesItem from '../ObservedGamesItem/ObservedGamesItem';
import styles from './ObservedGames.module.css';
import Spinner from "../../../../UI/spinners/Spinner";

const ObservedGames = ({ userId }) => {
  const { data: games, isFetching, isLoading, isError } = useGetObserverGamesQuery({ id: userId });

  if (isLoading || isFetching) {
    return <Spinner typeSpinner={'big'} className="mt-7" />;
  }

  if (isError) {
    return <ErrorMessage message="Ошибка загрузки игр" />;
  }

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.inner}>
          <h2 className={styles.title}>Назначенные игры</h2>
          <ul className={styles.list}>
            {games.map((game) => (
              <li
                className={styles.listItem}
                key={game.id}
              >
                <ObservedGamesItem game={game} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default ObservedGames;
