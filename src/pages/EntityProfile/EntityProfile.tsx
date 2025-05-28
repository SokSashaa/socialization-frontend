import React from 'react';
import {useParams} from 'react-router-dom';
import {useGetSingleUserQuery} from '@app/api/common/usersApiSlice';

import {ROLES} from '@utils/constants';

import {ObservedGames} from '../../modules/ObservedGames';
import {ObservedListV2} from '../../modules/ObservedListV2';
import {ObservedTests} from '../../modules/ObservedTests';
import {ErrorMessage} from '../../UI';
import Spinner from '../../UI/spinners/Spinner';

const EntityProfile = () => {
	const {id} = useParams();

	const numberId = Number(id);

	const {data: user, isLoading, isError, isFetching} = useGetSingleUserQuery(numberId);

	if (isError) {
		return <ErrorMessage message="Ошибка загрузки профиля" className="mt-7" />;
	}

	return (
		<>
			{isLoading || (isFetching && <Spinner style={{margin: '10px auto'}} />)}
			{user?.role === ROLES.observed.code && <ObservedTests userId={numberId} />}
			{user?.role === ROLES.observed.code && <ObservedGames userId={numberId} />}
			{user?.role === ROLES.tutor.code && <ObservedListV2 userId={numberId} />}
		</>
	);
};

export default EntityProfile;
