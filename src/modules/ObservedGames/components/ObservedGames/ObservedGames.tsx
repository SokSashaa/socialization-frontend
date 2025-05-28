import React from 'react';
import {useGetObserverGamesQuery} from '@app/api/common/gameApiSlice';

import {Container, ErrorMessage} from '../../../../UI';
import Spinner from '../../../../UI/spinners/Spinner';
import ObservedGamesItem from '../ObservedGamesItem/ObservedGamesItem';

import styles from './ObservedGames.module.css';

const ObservedGames = ({userId}: {userId: number}) => {
	const {
		data: games,
		isFetching,
		isLoading,
		isError,
	} = useGetObserverGamesQuery({user_id: userId});

	if (isLoading || isFetching) {
		return <Spinner style={{margin: '10px auto'}} />;
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
						{games?.results.map((game) => (
							<li className={styles.listItem} key={game.id}>
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
