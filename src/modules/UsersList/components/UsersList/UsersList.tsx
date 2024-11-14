import { useState } from 'react';
import { useGetUsersQuery } from '../../../../app/api/common/usersApiSlice';

import { Container, ButtonAddItemList, Modal, ModalLayout } from '../../../../UI';
import { FilteredList, Portal } from '../../../../components';
import NewUserForm from '../NewUserForm/NewUserForm';
import UserItem from '../UserItem/UserItem';
import styles from './UsersList.module.css';

const sortList = [
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


  const onSearch = (query) => {
    setSearchValue(query);
  };

  const onShowModal = () => {
    setShowModal(true);
  };

  const onSort = (value) => {
    setSortValue(value);
  };

  return (
    <div className={styles.wrapper}>
      <Container>
        <FilteredList
          items={data}
          onSearch={onSearch}
          isError={isError}
          onSort={onSort}
          sortList={sortList}
          isLoading={isLoading || isFetching}
          renderItemContent={(user) => <UserItem user={user} />}
        >
          <ButtonAddItemList onClick={onShowModal}> Добавить пользователя </ButtonAddItemList>
        </FilteredList>
      </Container>
      <Portal>
        <Modal
          active={showModal}
          setActive={setShowModal}
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
