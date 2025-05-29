import React from 'react';
import {useSearchParams} from 'react-router-dom';
import {useGetGamesQuery, useGetObserverGamesQuery} from '@app/api/common/gameApiSlice';

import {DEFAULT_GAMES_PAGINATION_LIMIT, GamesList} from '@pages/Games/components/GamesList';

import {gameSortListValuesType} from '@dto/games/getGames.dto';

import {useAppSelector} from '@hooks/redux';

import {ROLES} from '@utils/constants';

function Tests() {
	const currentUser = useAppSelector((state) => state.auth?.user);
	const [searchParams] = useSearchParams();

	const {
		data: adminData,
		isLoading,
		isError,
		isFetching,
	} = useGetGamesQuery(
		{
			search: searchParams.get('text') || '',
			ordering: (searchParams.get('ordering') as gameSortListValuesType) || 'id',
			limit: Number(searchParams.get('limit')) || DEFAULT_GAMES_PAGINATION_LIMIT,
			offset: Number(searchParams.get('offset')) || 0,
		},
		{skip: currentUser?.role === ROLES.observed.code}
	);

	const {
		data: observedData,
		isLoading: isObservedLoading,
		isFetching: isObservedFetching,
		isError: isObservedError,
	} = useGetObserverGamesQuery(
		{
			user_id: currentUser!.id,
			search: searchParams.get('text') || undefined,
			limit: Number(searchParams.get('limit')) || DEFAULT_GAMES_PAGINATION_LIMIT,
			offset: Number(searchParams.get('offset')) || 0,
		},
		{skip: currentUser?.role !== ROLES.observed.code}
	);

	return (
		<GamesList
			isLoading={isLoading || isFetching || isObservedLoading || isObservedFetching}
			isError={isError || isObservedError}
			data={currentUser?.role !== ROLES.observed.code ? adminData : observedData}
		/>
	);
}

export default Tests;
