import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {useGetObserverGamesQuery} from '@app/api/common/gameApiSlice';

import {ROUTING_FUNCTIONS} from '@routes/RouterConfig';

import css from './AppointedGames.module.scss';

interface AppointedGameProps {
	user_id: number;
}

const AppointedGames: FC<AppointedGameProps> = ({user_id}) => {
	const {data} = useGetObserverGamesQuery({user_id});

	const games = data?.results;

	return (
		<>
			<h3 className={css.title}>Назначенные игры</h3>
			{games && (
				<div>
					{games.length < 1 && <p className={css.empty}>Игры не назначены</p>}
					{games.length > 0 && (
						<ol>
							{games.map((game) => (
								<li key={game.id}>
									<div className={css.root}>
										{game.name}
										<Link
											to={ROUTING_FUNCTIONS.playingGame(game.id)}
											className={css.link}
										>
											Перейти к игре
										</Link>
									</div>
								</li>
							))}
						</ol>
					)}
				</div>
			)}
		</>
	);
};

export default AppointedGames;
