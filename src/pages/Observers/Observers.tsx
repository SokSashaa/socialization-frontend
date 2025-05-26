import {useSelector} from 'react-redux';
import {selectCurrentUser} from '../../modules/Auth';
import {ObservedList} from '../../modules/ObservedList';
import React from 'react';

const Observers = () => {
	const currentUser = useSelector(selectCurrentUser);

	return <ObservedList userId={currentUser?.id} />;
};

export default Observers;
