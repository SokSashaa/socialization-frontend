import { OptionHTMLAttributes, useState } from 'react';
import { useGetUsersQuery } from '@app/api/common/usersApiSlice';

import { FilteredList, Portal } from '../../../../components';
import { ButtonAddItemList, Container, Modal, ModalLayout } from '../../../../UI';
import NewUserForm from '../NewUserForm/NewUserForm';
import UserItem from '../UserItem/UserItem';

import styles from './UsersList.module.css';

const sortList: OptionHTMLAttributes<HTMLOptionElement>[] = [
    {
        label: 'По умолчанию',
        value: 'id',
    },
    {
        label: 'По имени (А-Я)',
        value: 'name',
    },
];

const UsersList = () => {
    const [searchValue, setSearchValue] = useState('');
    const [sortValue, setSortValue] = useState('id');
    const [showModal, setShowModal] = useState(false);

    const { data, isLoading, isFetching, isError } = useGetUsersQuery({
        search: searchValue.trim(),
        ordering: sortValue,
    });

    const onSearch = (query: string) => {
        setSearchValue(query);
    };

    const onShowModal = () => {
        setShowModal(true);
    };

    const handleOnChange = () => {
        setShowModal((prevShowModal) => !prevShowModal);
    };

    const onSort = (value: string) => {
        setSortValue(value);
    };

    return (
        <div className={styles.wrapper}>
            <Container>
                <FilteredList
                    items={data}
                    isError={isError}
                    sortList={sortList}
                    isLoading={isLoading || isFetching}
                    renderItemContent={(user) => <UserItem user={user} />}
                    onSearch={onSearch}
                    onSort={onSort}
                >
                    <ButtonAddItemList onClick={onShowModal}>
                        Добавить пользователя
                    </ButtonAddItemList>
                </FilteredList>
            </Container>
            <Portal>
                <Modal
                    active={showModal}
                    setActive={handleOnChange}
                >
                    <ModalLayout
                        title="Добавить пользователя"
                        content={<NewUserForm />}
                    />
                </Modal>
            </Portal>
        </div>
    );
};

export default UsersList;
