import { useGetGameQuery } from '../../../../app/api/common/gameApiSlice';
import { usePassGameMutation } from '../../api/passGameApiSlice';

import { SpinnerBig, ErrorMessage } from '../../../../UI';

import styles from './GameWindow.module.scss';
import Spinner from '../../../../UI/spinners/Spinner';

const GameWindow = ({ gameId, userId }) => {
    const {
        data: game,
        isLoading: isGameLoading,
        isError: isErrorGetGame,
    } = useGetGameQuery(gameId);

    // const [passGame, { isLoading: isLoadingPassGame }] = usePassGameMutation();

    if (isGameLoading) {
        return <Spinner style={{ margin: '15px auto' }} />;
    }

    if (isErrorGetGame) {
        return (
            <ErrorMessage
                message="Ошибка загрузки игры"
                className="mt-10"
            />
        );
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                <iframe
                    sandbox="allow-scripts allow-same-origin"
                    className={styles.content}
                    title="GameWindow"
                    src={game.link}
                />
            </div>
        </div>
    );
};

export default GameWindow;
