import React, {FC, InputHTMLAttributes, useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';

import {useDebounce} from '../../hooks';
import {InputBase} from '../../UI';

import styles from './SearchBar.module.css';

type SearchBarPropsType = InputHTMLAttributes<HTMLInputElement> & {
	onSearch?: (value: string) => void;
	searchBarParamName?: string;
};

const SearchBar: FC<SearchBarPropsType> = ({
	className,
	placeholder,
	onSearch = (value: string) => {},
	searchBarParamName = 'search',
}) => {
	const [searchParams] = useSearchParams();

	const [searchValue, setSearchValue] = useState(searchParams.get(searchBarParamName) || '');
	const debouncedSearchValue = useDebounce(searchValue);

	useEffect(() => {
		onSearch(debouncedSearchValue);
	}, [debouncedSearchValue]);

	return (
		<search role="search" className={className} onSubmitCapture={() => onSearch(searchValue)}>
			<InputBase
				className={styles.search}
				inputProps={
					{
						placeholder: placeholder || 'Поиск...',
						type: 'search',
						name: 'search',
						value: searchValue,
						onKeyDown: (event) => {
							if (event.key === 'Enter') {
								onSearch(searchValue);
							}
						},
						onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
							setSearchValue(event.target.value),
					} as React.InputHTMLAttributes<HTMLInputElement>
				}
			/>
		</search>
	);
};

export default SearchBar;
