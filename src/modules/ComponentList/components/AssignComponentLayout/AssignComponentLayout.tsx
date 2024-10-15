import { SearchBar } from '../../../../components';
import { Button, SpinnerMini, ErrorMessage, Checkbox } from '../../../../UI';
import styles from './AssignComponentLayout.module.css';

const AssignComponentLayout = (props) => {
  const {
    users,
    isError,
    isUsersLoading,
    onSearch,
    selectedUsers,
    onSelectUser,
    onAssign,
    isAssigning,
  } = props;

  const assignBtnContent = isAssigning ? <SpinnerMini /> : 'Назначить';

  return (
    <div className="text-center">
      <SearchBar
        className={styles.search}
        onSearch={onSearch}
      />
      {isUsersLoading && <SpinnerMini className={styles.spinner} />}
      {isError && (
        <ErrorMessage
          message="Ошибка загрузки пользователей"
          className={styles.error}
        />
      )}
      {!isUsersLoading && !isError && users && (
        <ul className={styles.list}>
          {users.map((user) => {
            const isAssigned = selectedUsers.includes(user.id);

            return (
              <li
                className={styles.item}
                key={user.id}
              >
                <Checkbox
                  label={`${user.second_name ?? 'фамилия'} ${user.name ?? 'имя'} ${user.patronymic ?? ''}`}
                  labelAlign="left"
                  labelClassName={styles.label}
                  checkboxProps={{
                    value: user?.id,
                    defaultChecked: isAssigned,
                    onChange: onSelectUser,
                  }}
                />
              </li>
            );
          })}
        </ul>
      )}
      <Button
        disabled={isAssigning}
        onClick={onAssign}
      >
        {assignBtnContent}
      </Button>
    </div>
  );
};

export default AssignComponentLayout;
