import React from 'react';
import {useSearchParams} from 'react-router-dom';
import {useGetObserverTestsQuery} from '@app/api/common/testApiSlice';
import {useGetTestsQuery} from '@app/api/common/testApiSlice';

import {DEFAULT_TESTS_PAGINATION_LIMIT, TestsList} from '@pages/TestsPage/components/TestsList';

import {sortListValuesType} from '@dto/testsDtos/getTests.dto';

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
	} = useGetTestsQuery(
		{
			search: searchParams.get('text') || '',
			ordering: (searchParams.get('ordering') as sortListValuesType) || 'id',
			limit: Number(searchParams.get('limit')) || DEFAULT_TESTS_PAGINATION_LIMIT,
			offset: Number(searchParams.get('offset')) || 0,
		},
		{skip: currentUser?.role === ROLES.observed.code}
	);

	const {
		data: observedData,
		isLoading: isObservedLoading,
		isFetching: isObservedFetching,
		isError: isObservedError,
	} = useGetObserverTestsQuery(
		{
			user_id: currentUser!.id,
			limit: Number(searchParams.get('limit')) || DEFAULT_TESTS_PAGINATION_LIMIT,
			offset: Number(searchParams.get('offset')) || 0,
		},
		{skip: currentUser?.role !== ROLES.observed.code || currentUser === null}
	);

	return (
		<TestsList
			isLoading={isLoading || isFetching || isObservedLoading || isObservedFetching}
			isError={isError || isObservedError}
			data={currentUser?.role !== ROLES.observed.code ? adminData : observedData}
		/>
	);
}

export default Tests;
