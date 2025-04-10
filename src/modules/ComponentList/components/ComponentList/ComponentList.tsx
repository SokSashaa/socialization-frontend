import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetObserverGamesQuery } from '@app/api/common/gameApiSlice';
import { useGetObserverTestsQuery } from '@app/api/common/testApiSlice';

import { gameSortList, testSortList } from '@modules/ComponentList/config/sortList';

import { FilteredList, Portal } from '@components/index';

import { ButtonAddItemList, Container } from '@UI/index';

import { user_dto } from '@dto/user.dto';

import { ROLES } from '@utils/constants';

import { useGetGamesQuery } from '../../api/gameApiSlice';
import { useGetTestsQuery } from '../../api/testApiSlice';
import {
    selectGameSearchValue,
    selectGamesSortValue,
    selectSelectedTest,
    selectTestSearchValue,
    selectTestSortValue,
} from '../../slice/selectors';
import {
    setGameSearch,
    setGamesSortValue,
    setTestSearch,
    setTestsSortValue,
} from '../../slice/testsSlice';
import AddGameModal from '../AddGameModal/AddGameModal';
import AssignComponentModal from '../AssignComponentModal/AssignComponentModal';
import CreateTestModal from '../CreateTestModal/CreateTestModal';
import GameListItem from '../GameListItem/GameListItem';
import TestListItem from '../TestListItem/TestListItem';

import styles from './ComponentList.module.css';

type ComponentListProps = {
    currentUser: user_dto;
    listType: 'tests' | 'games';
};

const ComponentList: FC<ComponentListProps> = ({ currentUser, listType }) => {
    const { id, role } = currentUser;

    const [showCreateTestModal, setShowCreateTestModal] = useState(false);
    const [showAddGameModal, setShowAddGameModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);

    const testSearchValue = useSelector(selectTestSearchValue);
    const testSortValue = useSelector(selectTestSortValue);

    const gameSearchValue = useSelector(selectGameSearchValue);
    const gamesSortValue = useSelector(selectGamesSortValue);

    const selectedTest = useSelector(selectSelectedTest);

    const useGetAdminQueryHook = listType === 'tests' ? useGetTestsQuery : useGetGamesQuery;
    const useGetObserverQueryHook =
        listType === 'tests' ? useGetObserverTestsQuery : useGetObserverGamesQuery;

    const {
        data: components,
        isLoading,
        isError,
        isFetching,
    } = useGetAdminQueryHook(
        {
            search: listType === 'tests' ? testSearchValue.trim() : gameSearchValue.trim(),
            sort: listType === 'tests' ? testSortValue : gamesSortValue,
        },
        { skip: role === ROLES.observed.code },
    );

    const {
        data: observedComponents,
        isLoading: isObservedComponentsLoading,
        isFetching: isObservedComponentsFetching,
        isError: isObservedComponentsError,
    } = useGetObserverQueryHook({ id }, { skip: role !== ROLES.observed.code });

    const dispatch = useDispatch();

    useEffect(
        () => () => {
            if (listType === 'tests') {
                dispatch(setTestSearch(''));
                dispatch(setTestsSortValue('id'));
            } else {
                dispatch(setGameSearch(''));
                dispatch(setGamesSortValue('id'));
            }
        },
        [],
    );

    const toggleModal = (action: string) => () => {
        if (action === 'assign') {
            setShowAssignModal((prev) => !prev);
        } else if (action === 'create') {
            setShowCreateTestModal((prev) => !prev);
        } else if (action === 'add') {
            setShowAddGameModal((prev) => !prev);
        }
    };

    const onSearch = (query: string) => {
        if (listType === 'tests') {
            dispatch(setTestSearch(query));
        } else {
            dispatch(setGameSearch(query));
        }
    };

    const onSort = (sortProperty: string) => {
        if (listType === 'tests') {
            dispatch(setTestsSortValue(sortProperty));
        } else {
            dispatch(setGamesSortValue(sortProperty));
        }
    };

    const onBtnAddClick = (type: string) => () => {
        if (type === 'tests') {
            toggleModal('create')();
        } else if (type === 'games') {
            window.location.href = 'http://localhost:5173/upload/';
        }
    };

    const addBtnText = listType === 'tests' ? 'Добавить тест' : 'Добавить игру';

    return (
        <div className={styles.wrapper}>
            <Container>
                <FilteredList
                    items={components || observedComponents}
                    sortList={listType === 'tests' ? testSortList : gameSortList}
                    isError={isError || isObservedComponentsError}
                    isLoading={
                        isLoading ||
                        isFetching ||
                        isObservedComponentsLoading ||
                        isObservedComponentsFetching
                    }
                    renderItemContent={(item) => {
                        if (listType === 'tests') {
                            return (
                                <TestListItem
                                    test={item}
                                    userId={id}
                                    toggleModal={toggleModal('assign')}
                                />
                            );
                        }
                        if (listType === 'games') {
                            return (
                                <GameListItem
                                    game={item}
                                    toggleModal={toggleModal('assign')}
                                />
                            );
                        }

                        return null;
                    }}
                    onSearch={onSearch}
                    onSort={onSort}
                >
                    {role !== ROLES.observed.code && role !== ROLES.tutor.code && (
                        <ButtonAddItemList onClick={onBtnAddClick(listType)}>
                            {addBtnText}
                        </ButtonAddItemList>
                    )}
                </FilteredList>
            </Container>
            <Portal>
                {(() => {
                    if (listType === 'tests') {
                        return (
                            <>
                                <CreateTestModal
                                    toggleModal={toggleModal('create')}
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
                        );
                    }
                    if (listType === 'games') {
                        return (
                            <>
                                <AddGameModal
                                    toggleModal={toggleModal('add')}
                                    showModal={showAddGameModal}
                                    setShowModal={setShowAddGameModal}
                                />
                                <AssignComponentModal
                                    componentId={selectedTest}
                                    showModal={showAssignModal}
                                    setShowModal={setShowAssignModal}
                                    listType={listType}
                                />
                            </>
                        );
                    }

                    return null;
                })()}
            </Portal>
        </div>
    );
};

export default ComponentList;
