import React from 'react';
import {useParams} from 'react-router-dom';

import {GameWindow} from '../../modules/PlayGame';

const PlayGame = () => {
	const {id} = useParams();

	return <GameWindow gameId={id} />;
};

export default PlayGame;
