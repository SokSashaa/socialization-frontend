import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetObserverGamesQuery } from '@app/api/common/gameApiSlice';

import { useGetGamesQuery } from '@modules/ComponentList/api/gameApiSlice';
import AddGameModal from '@modules/ComponentList/components/AddGameModal/AddGameModal';
import AssignComponentModal from '@modules/ComponentList/components/AssignComponentModal/AssignComponentModal';
import GameListItem from '@modules/ComponentList/components/GameListItem/GameListItem';
import { gameSortList } from '@modules/ComponentList/config/sortList';
import { setGameSearch, setGamesSortValue } from '@modules/ComponentList/slice/testsSlice';
import { ComponentListProps } from '@modules/ComponentList/types';

import { FilteredList, Portal } from '@components/index';

import { ButtonAddItemList, Container } from '@UI/index';

import { useAppDispatch, useAppSelector } from '@hooks/redux';

import { ROLES } from '@utils/constants';

import { ActionModalEnum } from './types';

import styles from '../../modules/ComponentList/components/ComponentList/ComponentList.module.css';

const ComponentsListGames: FC<ComponentListProps> = ({ currentUser, listType }) => {
    const { id, role } = currentUser;

    const [showAddGameModal, setShowAddGameModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);

    const gameSearchValue = useAppSelector((state) => state.tests?.gameSearch);
    const gamesSortValue = useAppSelector((state) => state.tests?.gamesSortValue);
    const selectedTest = useAppSelector((state) => state.tests?.selectedTest);

    const navigate = useNavigate();

    const {
        data: components,
        isLoading,
        isError,
        isFetching,
    } = useGetGamesQuery(
        {
            search: gameSearchValue!.trim(), // TODO: здесь ! не должен быть
            sort: gamesSortValue,
        },
        { skip: role === ROLES.observed.code },
    );

    const {
        data: observedComponents,
        isLoading: isObservedComponentsLoading,
        isFetching: isObservedComponentsFetching,
        isError: isObservedComponentsError,
    } = useGetObserverGamesQuery({ id }, { skip: role !== ROLES.observed.code });

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setGameSearch(''));
        dispatch(setGamesSortValue('id'));
    }, []);

    const onSearch = (query: string) => {
        dispatch(setGameSearch(query));
    };

    const onSort = (sortProperty: string) => {
        dispatch(setGamesSortValue(sortProperty));
    };

    const toggleModal = (action: ActionModalEnum) => {
        if (action === 'assign') {
            setShowAssignModal((prev) => !prev);
        } else if (action === 'add') {
            setShowAddGameModal((prev) => !prev);
        }
    };

    return (
        <div className={styles.wrapper}>
            <Container>
                <FilteredList
                    items={components || observedComponents}
                    sortList={gameSortList}
                    isError={isError || isObservedComponentsError}
                    isLoading={
                        isLoading ||
                        isFetching ||
                        isObservedComponentsLoading ||
                        isObservedComponentsFetching
                    }
                    renderItemContent={(item) => {
                        return (
                            <GameListItem
                                game={item}
                                toggleModal={() => toggleModal(ActionModalEnum.ASSIGN)}
                            />
                        );
                    }}
                    onSearch={onSearch}
                    onSort={onSort}
                >
                    {role !== ROLES.observed.code && role !== ROLES.tutor.code && (
                        <ButtonAddItemList onClick={() => navigate('#')}>
                            {' '}
                            {/*TODO: Исправить, когда будет ясность что тут и как*/}
                            Добавить игру
                        </ButtonAddItemList>
                    )}
                </FilteredList>
                <Portal>
                    {(() => {
                        return (
                            <>
                                <AddGameModal
                                    toggleModal={() => toggleModal(ActionModalEnum.ADD)}
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
                    })()}
                </Portal>
            </Container>
        </div>
    );
};

export default ComponentsListGames;
