import React, {FC, useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useGetObserverTestsQuery} from '@app/api/common/testApiSlice';

import {useGetTestsQuery} from '@modules/ComponentList/api/testApiSlice';
import AssignComponentModal from '@modules/ComponentList/components/AssignComponentModal/AssignComponentModal';
import styles from '@modules/ComponentList/components/ComponentList/ComponentList.module.css';
import CreateTestModal from '@modules/ComponentList/components/CreateTestModal/CreateTestModal';
import TestListItem from '@modules/ComponentList/components/TestListItem/TestListItem';
import {testSortList} from '@modules/ComponentList/config/sortList';
import {setTestSearch, setTestsSortValue} from '@modules/ComponentList/slice/testsSlice';
import {ComponentListProps} from '@modules/ComponentList/types';

import {FilteredList, Portal} from '@components/index';

import {ButtonAddItemList, Container} from '@UI/index';

import {Test_dto} from '@dto/test.dto';

import {useAppDispatch, useAppSelector} from '@hooks/redux';

import {ROLES} from '@utils/constants';

const DEFAULT_PAGINATION_LIMIT = 5;

const ComponentListTests: FC<ComponentListProps> = ({currentUser, listType}) => {
	const {id, role} = currentUser;

	const [showCreateTestModal, setShowCreateTestModal] = useState(false);
	const [showAssignModal, setShowAssignModal] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

	const dispatch = useAppDispatch();

	const testSearchValue = useAppSelector((state) => state.tests?.testSearch);
	const testSortValue = useAppSelector((state) => state.tests?.testsSortValue);
	const selectedTest = useAppSelector((state) => state.tests?.selectedTest);

	const [count, setCount] = useState(0);

	const pagination = {
		offset: Number(searchParams.get('offset')) || 0,
		limit: Number(searchParams.get('limit')) || DEFAULT_PAGINATION_LIMIT,
		count: count,
	};

	const {
		data: observedComponents,
		isLoading: isObservedComponentsLoading,
		isFetching: isObservedComponentsFetching,
		isError: isObservedComponentsError,
	} = useGetObserverTestsQuery({id}, {skip: role !== ROLES.observed.code});

	const {
		data: components,
		isLoading,
		isError,
		isFetching,
	} = useGetTestsQuery(
		{
			search: testSearchValue!.trim(), // TODO: ! лучше не использовать
			sort: testSortValue,
		},
		{skip: role === ROLES.observed.code}
	);

	useEffect(() => {
		if (observedComponents && observedComponents.count !== count) {
			setCount(observedComponents.count);
		}
	}, [observedComponents]);

	const onSearch = (query: string) => {
		dispatch(setTestSearch(query));
	};

	const onSort = (sortProperty: string) => {
		dispatch(setTestsSortValue(sortProperty));
	};

	const toggleModal = (action: string) => {
		if (action === 'assign') {
			setShowAssignModal((prev) => !prev);
		} else if (action === 'create') {
			setShowCreateTestModal((prev) => !prev);
		}
	};

	return (
		<div className={styles.wrapper}>
			<Container>
				<FilteredList<Test_dto>
					items={components || observedComponents}
					sortList={testSortList}
					isError={isError || isObservedComponentsError}
					pagination={pagination}
					isLoading={
						isLoading ||
						isFetching ||
						isObservedComponentsLoading ||
						isObservedComponentsFetching
					}
					renderListItem={(item: Test_dto) => {
						return (
							<TestListItem
								test={item}
								userId={id}
								toggleModal={() => toggleModal('assign')}
							/>
						);
					}}
					onSearch={onSearch}
					onSort={onSort}
				>
					{role !== ROLES.observed.code && role !== ROLES.tutor.code && (
						<ButtonAddItemList onClick={() => toggleModal('create')}>
							Добавить тест
						</ButtonAddItemList>
					)}
				</FilteredList>
			</Container>
			<Portal>
				<>
					<CreateTestModal
						toggleModal={() => toggleModal('create')}
						showModal={showCreateTestModal}
						setShowModal={setShowCreateTestModal}
					/>
					<AssignComponentModal
						componentId={selectedTest}
						showModal={showAssignModal}
						setShowModal={setShowAssignModal}
						listType={listType}
					/>
				</>
			</Portal>
		</div>
	);
};

export default ComponentListTests;
