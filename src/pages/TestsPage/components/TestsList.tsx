import React, {FC, useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';

import {AssignTestsModal} from '@pages/TestsPage/components/AssignTestsModal/AssignTestsModal';
import CreateTestModal from '@pages/TestsPage/components/CreateTestModal/CreateTestModal';
import TestListItem from '@pages/TestsPage/components/TestListItem/TestListItem';

import {FilteredList} from '@components/index';

import {ButtonAddItemList, Container} from '@UI/index';

import {getTestsResponse, testSortList} from '@dto/testsDtos/getTests.dto';
import {Test_dto} from '@dto/testsDtos/test.dto';

import {useAppSelector} from '@hooks/redux';

import {RoleCode, ROLES} from '@utils/constants';

import styles from './TestsList.module.scss';

export const DEFAULT_TESTS_PAGINATION_LIMIT = 5;

type TestsListProps = {
	isError: boolean;
	isLoading: boolean;
	data?: getTestsResponse;
};

export const TestsList: FC<TestsListProps> = ({isLoading, isError, data}) => {
	const user = useAppSelector((state) => state.auth.user);
	const role = user?.role as RoleCode;

	const [searchParams, setSearchParams] = useSearchParams();
	const [selectedTest, setSelectedTest] = useState<null | number>(null);

	const [count, setCount] = useState(0);

	const [modalState, setModalState] = useState<null | 'assign' | 'create'>(null);
	const pagination = {
		offset: Number(searchParams.get('offset')) || 0,
		limit: Number(searchParams.get('limit')) || DEFAULT_TESTS_PAGINATION_LIMIT,
		count: count,
	};

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

	const toggleModal = (action: 'assign' | 'create') => {
		if (!modalState) {
			setModalState(action);
		} else {
			setModalState(null);
		}
	};

	return (
		<div className={styles.wrapper}>
			<Container>
				<FilteredList<Test_dto>
					isError={isError}
					sortList={role === ROLES.observed.code ? undefined : testSortList}
					isLoading={isLoading}
					pagination={pagination}
					items={data?.results || []}
					renderListItem={(test) => (
						<TestListItem
							test={test}
							openAssignModal={() => toggleModal('assign')}
							setSelectedTest={setSelectedTest}
						/>
					)}
					onSearch={onSearch}
					onSort={onSort}
				>
					{role !== ROLES.observed.code && (
						<ButtonAddItemList onClick={() => toggleModal('create')}>
							Добавить тест
						</ButtonAddItemList>
					)}
				</FilteredList>
			</Container>

			<CreateTestModal
				isOpenModal={modalState === 'create'}
				closeModal={() => setModalState(null)}
			/>

			<AssignTestsModal
				showModal={modalState === 'assign'}
				selectedTest={selectedTest}
				setShowModal={setModalState}
			/>
		</div>
	);
};
