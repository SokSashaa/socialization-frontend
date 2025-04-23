import { FC, OptionHTMLAttributes, ReactNode } from 'react';
import { m } from 'framer-motion';

import { SpinnerSize } from '@UI/spinners/types';

import { ErrorMessage } from '../../UI';
import Spinner from '../../UI/spinners/Spinner';
import SearchBar from '../SearchBar/SearchBar';
import Sort from '../Sort/Sort';

import styles from './FilteredList.module.css';

const liVariants = {
    visible: (i) => ({
        y: 0,
        opacity: 1,
        transition: { delay: i * 0.2, duration: 0.2, type: 'ease' },
    }),
    hidden: {
        opacity: 0,
        y: 20,
    },
};

interface FilteredListProps {
    items: any;
    sortList: OptionHTMLAttributes<HTMLOptionElement>[];
    onSort: (value: string) => void;
    onSearch: (value: string) => void;
    renderItemContent: (value: any) => void;
    children?: ReactNode;
    isLoading?: boolean;
    isError?: boolean;
}

const FilteredList: FC<FilteredListProps> = ({
    items,
    children,
    isLoading,
    isError,
    sortList = [],
    renderItemContent = () => {},
    onSearch = (value) => {},
    onSort = (value) => {},
}) => {
    const renderItems = (data, renderItem) => {
        const renderedItems = data?.map((item, i) => (
            <m.li
                variants={liVariants}
                initial="hidden"
                animate="visible"
                custom={i}
                className={styles.listItem}
                key={item?.id}
            >
                {renderItem(item)}
            </m.li>
        ));

        return <ul>{renderedItems}</ul>; // className={styles.list}
    };

    const loading = isLoading ? (
        <Spinner
            style={{ margin: '28px auto' }}
            size={SpinnerSize.LARGE}
        />
    ) : null;

    const error = isError ? (
        <ErrorMessage
            message="Ошибка загрузки списка"
            className="mt-6"
        />
    ) : null;

    const content = !isLoading && !isError ? renderItems(items, renderItemContent) : null;

    return (
        <div className={styles.wrapper}>
            <form className={styles.form}>
                <SearchBar
                    className={styles.searchBar}
                    onSearch={onSearch}
                />
                <Sort
                    className={styles.sortWrapper}
                    options={sortList}
                    onSort={onSort}
                />
            </form>
            {children}
            {loading}
            {error}
            {content}
        </div>
    );
};

export default FilteredList;
