import React, {FC, useState} from 'react';
import {Select} from '../../UI';
import styles from './Sort.module.css';

type SortProps = {
    options: [{ value: string, label: string }],
    className: string,
    onSort: (string) => void
}

const Sort: FC<SortProps> = ({
                                 options, className, onSort = (value: string) => {}
                             }) => {
    const [sortValue, setSortValue] = useState('');
    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSortValue(value);
        onSort(value);
    };

    return (
        <Select
            options={options}
            className={className} // className={clsx(styles.wrapper, className)}
            selectProps={{
                className: styles.select,
                name: 'sort',
                value: sortValue,
                onChange,
            }}
        />
    );
};

export default Sort;
