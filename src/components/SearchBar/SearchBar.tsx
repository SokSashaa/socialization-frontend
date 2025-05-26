import React, {FC, InputHTMLAttributes, useEffect, useState} from 'react';

import {useDebounce} from '../../hooks';
import {InputBase} from '../../UI';

import styles from './SearchBar.module.css';
import {useSearchParams} from 'react-router-dom';

type SearchBarPropsType = InputHTMLAttributes<HTMLInputElement> & {
	onSearch?: (value: string) => void;
};

const SearchBar: FC<SearchBarPropsType> = ({
	className,
	placeholder,
	onSearch = (value: string) => {},
}) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');
	const debouncedSearchValue = useDebounce(searchValue);

	useEffect(() => {
		onSearch(debouncedSearchValue);
	}, [debouncedSearchValue]);

	return (
		<search
			role="search"
			className={className}
			onSubmitCapture={(event) => onSearch(searchValue)}
		>
			<InputBase
				className={styles.search}
				inputProps={{
					placeholder: placeholder || 'Поиск...',
					type: 'search',
					name: 'search',
					value: searchValue,
					onKeyDown: (event) => {
						event.key === 'Enter' && onSearch(searchValue);
					},
					onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
						setSearchValue(event.target.value),
				}}
			/>
		</search>
	);
};

export default SearchBar;
