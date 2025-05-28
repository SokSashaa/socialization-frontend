import React from 'react';

import {useGetGameQuery} from '../../../../app/api/common/gameApiSlice';
import {ErrorMessage} from '../../../../UI';
import Spinner from '../../../../UI/spinners/Spinner';

import styles from './GameWindow.module.scss';

const GameWindow = ({gameId, userId}) => {
	const {data: game, isLoading: isGameLoading, isError: isErrorGetGame} = useGetGameQuery(gameId);

	// const [passGame, { isLoading: isLoadingPassGame }] = usePassGameMutation();

	if (isGameLoading) {
		return <Spinner style={{margin: '15px auto'}} />;
	}

	if (isErrorGetGame) {
		return <ErrorMessage message="Ошибка загрузки игры" className="mt-10" />;
	}

	console.log(JSON.stringify(game));

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
