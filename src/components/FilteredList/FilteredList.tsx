import { m } from 'framer-motion';
import Sort from '../Sort/Sort';
import SearchBar from '../SearchBar/SearchBar';
import { SpinnerBig, ErrorMessage } from '../../UI';
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

const FilteredList = ({
  items,
  children,
  isLoading,
  isError,
  sortList = [],
  renderItemContent = () => {},
  onSearch = () => {},
  onSort = () => {},
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

    return <ul className={styles.list}>{renderedItems}</ul>;
  };

  const loading = isLoading ? <SpinnerBig className="mt-7" /> : null;

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
          onSearch={onSearch}
          className={styles.searchBar}
        />
        <Sort
          className={styles.sortWrapper}
          onSort={onSort}
          options={sortList}
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
