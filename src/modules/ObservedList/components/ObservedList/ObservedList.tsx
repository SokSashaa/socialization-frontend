import { useState } from 'react';
import { useGetObservedsByTutorQuery } from '../../../../app/api/common/usersApiSlice';
import { FilteredList } from '../../../../components';
import { Container } from '../../../../UI';
import ObservedItem from '../ObservedItem/ObservedItem';
import styles from './ObservedList.module.css';

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

const ObservedList = ({ userId }) => {
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState('id');

  const {
    data: curObserveds,
    isLoading,
    isError,
    isFetching,
  } = useGetObservedsByTutorQuery({ id: userId, text: searchValue, ordering: sortValue });

  const onSort = (value) => {
    setSortValue(value);
  };

  const onSearch = (query) => {
    setSearchValue(query);
  };

  console.log(curObserveds)
  return (
    <div className={styles.wrapper}>
      <Container>
        <FilteredList
          items={curObserveds}
          isError={isError}
          sortList={sortList}
          onSearch={onSearch}
          onSort={onSort}
          isLoading={isLoading || isFetching}
          renderItemContent={(user) => <ObservedItem user={user} />}
        />
      </Container>
    </div>
  );
};

export default ObservedList;
