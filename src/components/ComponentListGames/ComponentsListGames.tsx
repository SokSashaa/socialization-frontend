import {FC, useState} from "react";
import styles from "../../modules/ComponentList/components/ComponentList/ComponentList.module.css";
import {ButtonAddItemList, Container} from "../../UI";
import {FilteredList, Portal} from "../index";
import TestListItem from "../../modules/ComponentList/components/TestListItem/TestListItem";
import {ROLES} from "../../utils/constants";
import CreateTestModal from "../../modules/ComponentList/components/CreateTestModal/CreateTestModal";
import AssignComponentModal from "../../modules/ComponentList/components/AssignComponentModal/AssignComponentModal";
import {useGetTestsQuery} from "../../modules/ComponentList/api/testApiSlice";
import {useGetGamesQuery} from "../../modules/ComponentList/api/gameApiSlice";
import {useGetObserverTestsQuery} from "../../app/api/common/testApiSlice";
import {useGetObserverGamesQuery} from "../../app/api/common/gameApiSlice";
import {useSelector} from "react-redux";
import {
    selectGameSearchValue,
    selectGamesSortValue,
    selectSelectedTest
} from "../../modules/ComponentList/slice/selectors";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {
    setGameSearch,
    setGamesSortValue,
    setTestSearch,
    setTestsSortValue
} from "../../modules/ComponentList/slice/testsSlice";
import GameListItem from "../../modules/ComponentList/components/GameListItem/GameListItem";
import AddGameModal from "../../modules/ComponentList/components/AddGameModal/AddGameModal";

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

const ComponentsListGames: FC = (currentUser, listType) => {

    const { id, role } = currentUser;

    const [showCreateTestModal, setShowCreateTestModal] = useState(false);
    const [showAddGameModal, setShowAddGameModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);

    const gameSearchValue = useAppSelector(state => state.tests?.gameSearch)
    const gamesSortValue = useAppSelector(state => state.tests?.gamesSortValue)
    const selectedTest = useAppSelector(state => state.tests?.selectedTest);

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
    } =  useGetObserverGamesQuery({ id }, { skip: role !== ROLES.observed.code });

    const dispatch = useAppDispatch()

    const onSearch = (query) => {
        dispatch(setGameSearch(query));
    };

    const onSort = (sortProperty) => {
        dispatch(setGamesSortValue(sortProperty));

    };

    const toggleModal = (action) => () => {
        if (action === 'assign') {
            setShowAssignModal((prev) => !prev);
        } else if (action === 'create') {
            setShowCreateTestModal((prev) => !prev);
        } else if (action === 'add') {
            setShowAddGameModal((prev) => !prev);
        }
    };


    return <div className={styles.wrapper}>
        <Container>
            <FilteredList
                items={components || observedComponents}
                onSearch={onSearch}
                onSort={onSort}
                sortList={gameSortList}
                isError={isError || isObservedComponentsError}
                isLoading={
                    isLoading || isFetching || isObservedComponentsLoading || isObservedComponentsFetching
                }
                renderItemContent={(item) => {
                    return (
                        <GameListItem
                            game={item}
                            toggleModal={toggleModal('assign')}
                        />
                    );

                }}
            >
                {role !== ROLES.observed.code && role !== ROLES.tutor.code && (
                    <ButtonAddItemList onClick={() => toggleModal('create')}>Добавить игру</ButtonAddItemList>
                )}
            </FilteredList>
            <Portal>
                {(() => {
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
                })()}
            </Portal>
        </Container>
    </div>
}

export default ComponentsListGames
