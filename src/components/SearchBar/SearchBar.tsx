import { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks';
import { InputBase } from '../../UI';
import styles from './SearchBar.module.css';

const SearchBar = ({ className, placeholder, onSearch = () => {} }) => {
  const [searchValue, setSearchValue] = useState('');

  const debouncedSearchValue = useDebounce(searchValue);

  const onSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    onSearch(debouncedSearchValue);
  }, [debouncedSearchValue]);

  return (
    <search
      role="search"
      className={className}
    >
      <InputBase
        className={styles.wrapper}
        inputProps={{
          className: styles.search,
          placeholder: placeholder || 'Поиск...',
          type: 'search',
          name: 'search',
          value: searchValue,
          onChange: onSearchChange,
        }}
      />
    </search>
  );
};

export default SearchBar;
