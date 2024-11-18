import {FC, useState} from "react";
import { Container, ButtonAddItemList } from '../../UI';
import {FilteredList, Portal} from "../index";
import TestListItem from "../../modules/ComponentList/components/TestListItem/TestListItem";
import {ROLES} from "../../utils/constants";
import CreateTestModal from "../../modules/ComponentList/components/CreateTestModal/CreateTestModal";
import AssignComponentModal from "../../modules/ComponentList/components/AssignComponentModal/AssignComponentModal";
import {useGetTestsQuery} from "../../modules/ComponentList/api/testApiSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useGetObserverTestsQuery} from "../../app/api/common/testApiSlice";
import {setTestSearch, setTestsSortValue} from "../../modules/ComponentList/slice/testsSlice";
import styles from "../../modules/ComponentList/components/ComponentList/ComponentList.module.css";


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

const ComponentListTests: FC = ({currentUser, listType}) => {

    const {id, role} = currentUser;

    const [showCreateTestModal, setShowCreateTestModal] = useState(false);
    const [showAddGameModal, setShowAddGameModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);

    const dispatch = useAppDispatch()


    const testSearchValue = useAppSelector(state => state.tests?.testSearch)
    const testSortValue = useAppSelector(state => state.tests?.testsSortValue)
    const selectedTest = useAppSelector(state => state.tests?.selectedTest);

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
        {skip: role === ROLES.observed.code},
    );

    const onSearch = (query: string) => {
        dispatch(setTestSearch(query));
    };

    const onSort = (sortProperty: string) => {
        dispatch(setTestsSortValue(sortProperty));
    };

    const toggleModal = (action: string) => () => {
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
                sortList={testSortList}
                isError={isError || isObservedComponentsError}
                isLoading={
                    isLoading || isFetching || isObservedComponentsLoading || isObservedComponentsFetching
                }
                renderItemContent={(item) => {
                    return (
                        <TestListItem
                            test={item}
                            userId={id}
                            toggleModal={toggleModal('assign')}
                        />
                    );

                }}
            >
                {role !== ROLES.observed.code && role !== ROLES.tutor.code && (
                    <ButtonAddItemList onClick={() => toggleModal('create')}>Добавить тест</ButtonAddItemList>
                )}
            </FilteredList>
            <Portal>
                {(() => {
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


                })()}
            </Portal>
        </Container>
    </div>
}


export default ComponentListTests
