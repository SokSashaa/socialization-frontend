import { SearchBar } from '../../../../components';
import { Button, Checkbox, SpinnerMini, ErrorMessage } from '../../../../UI';
import styles from './AssignTutorModalLayout.module.css';

const AssignTutorModalLayout = ({
  observeds,
  onSearch,
  onAssign,
  isObservedsLoading,
  isError,
  onSelectObs,
  isAssigning,
}) => {
  const assignBtnText = isAssigning ? <SpinnerMini /> : 'Назначить';

  return (
    <div className="text-center">
      <SearchBar
        className={styles.search}
        onSearch={onSearch}
      />
      {isObservedsLoading && <SpinnerMini className={styles.spinner} />}
      {isError && (
        <ErrorMessage
          message="Ошибка загрузки пользователей"
          className={styles.error}
        />
      )}
      {!isObservedsLoading && !isError && observeds && (
        <ul className={styles.list}>
          {observeds.map((obs) => (
            <li
              className={styles.item}
              key={obs.id}
            >
              <Checkbox
                label={`${obs.second_name ?? 'фамилия'} ${obs.name ?? 'имя'} ${obs.patronymic ?? ''}`}
                labelAlign="left"
                labelClassName={styles.label}
                checkboxProps={{
                  value: obs?.id,
                  onChange: onSelectObs,
                }}
              />
            </li>
          ))}
        </ul>
      )}
      <Button
        disabled={isAssigning}
        onClick={onAssign}
      >
        {assignBtnText}
      </Button>
    </div>
  );
};

export default AssignTutorModalLayout;
