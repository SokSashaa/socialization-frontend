import React from 'react';
import {useGetObserverTestsQuery} from '@app/api/common/testApiSlice';

import {Container, ErrorMessage} from '../../../../UI';
import Spinner from '../../../../UI/spinners/Spinner';
import ObservedTestsItem from '../ObservedTestsItem/ObservedTestsItem';

import styles from './ObservedTests.module.css';

const ObservedTests = ({userId}: {userId: number}) => {
	const {
		data: tests,
		isLoading,
		isError,
		isFetching,
	} = useGetObserverTestsQuery({user_id: userId});

	if (isLoading || isFetching) {
		return <Spinner style={{margin: '10px auto'}} />;
	}

	if (isError) {
		return <ErrorMessage message="Ошибка загрузки тестов" className="mt-7" />;
	}

	return (
		<div className={styles.wrapper}>
			<Container>
				<div className={styles.inner}>
					<h2 className={styles.title}>Назначенные тесты</h2>
					<ul className={styles.list}>
						{tests.results.map((test) => (
							<li className={styles.listItem} key={test.id}>
								<ObservedTestsItem test={test} userId={userId} />
							</li>
						))}
					</ul>
				</div>
			</Container>
		</div>
	);
};

export default ObservedTests;
