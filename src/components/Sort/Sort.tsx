import { useState } from 'react';
import clsx from 'clsx';
import { Select } from '../../UI';
import styles from './Sort.module.css';

const Sort = ({ options, className, onSort = () => {} }) => {
  const [sortValue, setSortValue] = useState('');
  const onChange = (event) => {
    const { value } = event.target;

    setSortValue(value);
    onSort(value);
  };

  return (
    <Select
      options={options}
      className={clsx(styles.wrapper, className)}
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
