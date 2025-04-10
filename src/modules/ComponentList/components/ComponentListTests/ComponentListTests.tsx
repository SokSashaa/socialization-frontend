import React, { FC, useState } from 'react';
import { useGetObserverTestsQuery } from '@app/api/common/testApiSlice';

import { useGetTestsQuery } from '@modules/ComponentList/api/testApiSlice';
import AssignComponentModal from '@modules/ComponentList/components/AssignComponentModal/AssignComponentModal';
import styles from '@modules/ComponentList/components/ComponentList/ComponentList.module.css';
import CreateTestModal from '@modules/ComponentList/components/CreateTestModal/CreateTestModal';
import TestListItem from '@modules/ComponentList/components/TestListItem/TestListItem';
import { testSortList } from '@modules/ComponentList/config/sortList';
import { setTestSearch, setTestsSortValue } from '@modules/ComponentList/slice/testsSlice';
import { ListTypeEnum } from '@modules/ComponentList/types';

import { FilteredList, Portal } from '@components/index';

import { ButtonAddItemList, Container } from '@UI/index';

import { user_dto } from '@dto/user.dto';

import { useAppDispatch, useAppSelector } from '@hooks/redux';

import { ROLES } from '@utils/constants';

interface ComponentListTestsProps {
    currentUser: user_dto;
    listType: ListTypeEnum;
}

const ComponentListTests: FC<ComponentListTestsProps> = ({ currentUser, listType }) => {
    const { id, role } = currentUser;

    const [showCreateTestModal, setShowCreateTestModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);

    const dispatch = useAppDispatch();

    const testSearchValue = useAppSelector((state) => state.tests?.testSearch);
    const testSortValue = useAppSelector((state) => state.tests?.testsSortValue);
    const selectedTest = useAppSelector((state) => state.tests?.selectedTest);

    const {
        data: observedComponents,
        isLoading: isObservedComponentsLoading,
        isFetching: isObservedComponentsFetching,
        isError: isObservedComponentsError,
    } = useGetObserverTestsQuery({ id }, { skip: role !== ROLES.observed.code });

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
        { skip: role === ROLES.observed.code },
    );

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
        // else if (action === 'add') {
        //     setShowAddGameModal((prev) => !prev);
        // }
    };

    return (
        <div className={styles.wrapper}>
            <Container>
                <FilteredList
                    items={components || observedComponents}
                    sortList={testSortList}
                    isError={isError || isObservedComponentsError}
                    isLoading={
                        isLoading ||
                        isFetching ||
                        isObservedComponentsLoading ||
                        isObservedComponentsFetching
                    }
                    renderItemContent={(item) => {
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
