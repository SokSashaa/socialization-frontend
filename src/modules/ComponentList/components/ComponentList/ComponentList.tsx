import {useState, useEffect, FC} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetTestsQuery } from '../../api/testApiSlice';
import { useGetGamesQuery } from '../../api/gameApiSlice';
import { useGetObserverGamesQuery } from '../../../../app/api/common/gameApiSlice';
import { useGetObserverTestsQuery } from '../../../../app/api/common/testApiSlice';
import {
  setTestSearch,
  setGameSearch,
  setGamesSortValue,
  setTestsSortValue,
} from '../../slice/testsSlice';
import {
  selectTestSearchValue,
  selectGameSearchValue,
  selectSelectedTest,
  selectGamesSortValue,
  selectTestSortValue,
} from '../../slice/selectors';

import { Portal, FilteredList } from '../../../../components';
import { Container, ButtonAddItemList } from '../../../../UI';
import TestListItem from '../TestListItem/TestListItem';
import GameListItem from '../GameListItem/GameListItem';
import CreateTestModal from '../CreateTestModal/CreateTestModal';
import AddGameModal from '../AddGameModal/AddGameModal';
import AssignComponentModal from '../AssignComponentModal/AssignComponentModal';

import { ROLES } from '../../../../utils/constants';
import styles from './ComponentList.module.css';
import {user_dto} from "../../../../dto/user.dto";

const gameSortList = [
  {
    label: 'По умолчанию',
    value: 'id',
  },
  {
    label: 'По имени (А-Я)',
    value: 'name',
  },
];


const testSortList = [
  {
    label: 'По умолчанию',
    value: 'id',
  },
  {
    label: 'По имени (А-Я)',
    value: 'title',
  },
  {
    label: 'По дате',
    value: 'created_at',
  },
];


export enum listType {
  tests,
  games,
}

type ComponentListProps = {
  currentUser: user_dto,
  listType: 'tests' | 'games'
}


const ComponentList:FC<ComponentListProps> = ({ currentUser, listType }) => {
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

  const toggleModal = (action) => () => {
    if (action === 'assign') {
      setShowAssignModal((prev) => !prev);
    } else if (action === 'create') {
      setShowCreateTestModal((prev) => !prev);
    } else if (action === 'add') {
      setShowAddGameModal((prev) => !prev);
    }
  };

  const onSearch = (query) => {
    if (listType === 'tests') {
      dispatch(setTestSearch(query));
    } else {
      dispatch(setGameSearch(query));
    }
  };

  const onSort = (sortProperty) => {
    if (listType === 'tests') {
      dispatch(setTestsSortValue(sortProperty));
    } else {
      dispatch(setGamesSortValue(sortProperty));
    }
  };

  const onBtnAddClick = (type) => () => {
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
          onSearch={onSearch}
          onSort={onSort}
          sortList={listType === 'tests' ? testSortList : gameSortList}
          isError={isError || isObservedComponentsError}
          isLoading={
            isLoading || isFetching || isObservedComponentsLoading || isObservedComponentsFetching
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
        >
          {role !== ROLES.observed.code && role !== ROLES.tutor.code && (
            <ButtonAddItemList onClick={onBtnAddClick(listType)}>{addBtnText}</ButtonAddItemList>
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
