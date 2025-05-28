import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useSearchParams} from 'react-router-dom';
import {useGetObservedsByTutorQuery} from '@app/api/common/usersApiSlice';

import {selectCurrentUser} from '@modules/Auth';

import {FilteredList} from '@components/index';

import {Container} from '@UI/index';

import {sortList} from '@dto/users/getObservedsByTutor.dto';
import {getObservedsByTutorSortListValuesType} from '@dto/users/getObservedsByTutor.dto';
import {user_dto} from '@dto/users/user.dto';

import ObservedItem from './components/ObservedItem/ObservedItem';

import styles from './Observers.module.scss';

const DEFAULT_PAGINATION_LIMIT = 5;

const Observers = () => {
	const currentUser = useSelector(selectCurrentUser);

	const [searchParams, setSearchParams] = useSearchParams();
	const [count, setCount] = useState(0);

	const pagination = {
		offset: Number(searchParams.get('offset')) || 0,
		limit: Number(searchParams.get('limit')) || DEFAULT_PAGINATION_LIMIT,
		count: count,
	};

	const {data, isLoading, isError, isFetching} = useGetObservedsByTutorQuery({
		id: currentUser!.id,
		text: searchParams.get('text') || '',
		ordering: (searchParams.get('ordering') as getObservedsByTutorSortListValuesType) || 'id',
		limit: pagination.limit,
		offset: pagination.offset,
	});

	useEffect(() => {
		if (data && data.count !== count) {
			setCount(data.count);
		}
	}, [data]);

	const onSort = (value: string) => {
		setSearchParams((prev) => {
			const params = new URLSearchParams(prev);

			if (value) {
				params.set('ordering', value);
			} else {
				params.delete('ordering');
			}

			return params;
		});
	};

	const onSearch = (query: string) => {
		setSearchParams((prev) => {
			const value = query.trim();
			const params = new URLSearchParams(prev);

			if (value) {
				params.set('text', value);
			} else {
				params.delete('text');
			}

			return params;
		});
	};

	return (
		<div className={styles.wrapper}>
			<Container>
				<FilteredList<user_dto>
					items={data?.results || []}
					isError={isError}
					sortList={sortList}
					isLoading={isLoading || isFetching}
					renderListItem={(user: user_dto) => <ObservedItem user={user} />}
					pagination={pagination}
					onSearch={onSearch}
					onSort={onSort}
				/>
			</Container>
		</div>
	);
};

export default Observers;
