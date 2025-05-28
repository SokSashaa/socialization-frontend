import React from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {selectCurrentUser} from '../../modules/Auth';
import {GameWindow} from '../../modules/PlayGame';

const PlayGame = () => {
	const {id} = useParams();
	const user = useSelector(selectCurrentUser);

	return <GameWindow gameId={id} userId={user?.id} />;
};

export default PlayGame;
