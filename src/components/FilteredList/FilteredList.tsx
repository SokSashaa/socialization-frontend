import React, {ReactNode} from 'react';
import {m} from 'framer-motion';

import {Pagination, PaginationProps} from '@components/Pagination/Pagination';
import SearchBar from '@components/SearchBar/SearchBar';
import Sort from '@components/Sort/Sort';

import {ErrorMessage, Spinner} from '@UI/index';

import css from './FilteredList.module.css';

const liVariants = {
	visible: (i: number) => ({
		y: 0,
		opacity: 1,
		transition: {delay: i * 0.2, duration: 0.2, type: 'ease'},
	}),
	hidden: {
		opacity: 0,
		y: 20,
	},
};

type FilteredListProps<ItemsType> = {
	items: ItemsType[];
	sortList?: {
		label: string;
		value: string;
	}[];
	onSort?: (value: string) => void;
	onSearch?: (value: string) => void;
	renderListItem: (value: ItemsType) => ReactNode;
	children?: ReactNode;
	isLoading?: boolean;
	isError?: boolean;
} & PaginationProps;

export const FilteredList = <ItemsType,>(props: FilteredListProps<ItemsType>) => {
	const {
		isLoading,
		isError,
		sortList,
		onSort,
		renderListItem,
		onSearch,
		children,
		items,
		pagination,
	} = props;

	const renderLoading = <Spinner size={'large'} style={{margin: '28px auto'}} />;
	const renderError = <ErrorMessage message="Ошибка загрузки списка" className="mt-6" />;

	const renderItems = (
		<div>
			{pagination.count > 0 && <Pagination pagination={pagination} />}
			<ul>
				{items.map((item, i) => (
					<m.li
						key={i}
						className={css.listItem}
						variants={liVariants}
						initial="hidden"
						animate="visible"
						custom={i}
					>
						{renderListItem(item)}
					</m.li>
				))}
			</ul>
		</div>
	);

	return (
		<div className={css.wrapper}>
			<div className={css.form}>
				{onSearch && <SearchBar className={css.searchBar} onSearch={onSearch} />}

				{onSort && sortList && (
					<Sort className={css.sortWrapper} options={sortList} onSort={onSort} />
				)}
			</div>

			{children}

			{isLoading && renderLoading}

			{isError && renderError}

			{!isLoading && !isError && renderItems}
		</div>
	);
};

export default FilteredList;
