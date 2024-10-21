import React, {FC, HTMLAttributes, useEffect, useState} from 'react';
import {useDebounce} from '../../hooks';
import {InputBase} from '../../UI';
import styles from './SearchBar.module.css';

const SearchBar: FC<HTMLAttributes<HTMLInputElement>> = ({
                                                             className,
                                                             placeholder,
                                                             onSearch = (value: any) => {
    }
                                                         }) => {
    const [searchValue, setSearchValue] = useState('');

    const debouncedSearchValue = useDebounce(searchValue);

    useEffect(() => {
        onSearch(debouncedSearchValue);
    }, [debouncedSearchValue]);

    return (
        <search
            role="search"
            className={className}
        >
            <InputBase
                inputProps={{
                    className: styles.search,
                    placeholder: placeholder || 'Поиск...',
                    type: 'search',
                    name: 'search',
                    value: searchValue,
                    onChange: (event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value),
                }}
            />
        </search>
    );
};

export default SearchBar;
