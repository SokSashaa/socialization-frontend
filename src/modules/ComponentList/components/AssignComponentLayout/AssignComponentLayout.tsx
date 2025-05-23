import { SearchBar } from '../../../../components';
import { Button, Checkbox, ErrorMessage } from '../../../../UI';
import styles from './AssignComponentLayout.module.css';
import Spinner from '../../../../UI/spinners/Spinner';
import { FC } from 'react';

type AssignComponentLayoutProps = {
    users: any;
    isError: boolean;
    isUsersLoading: boolean;
    onSearch: (value: any) => void;
    selectedUsers: any[];
    onSelectUser: (value) => void;
    onAssign: () => void;
    isAssigning: boolean;
};

const AssignComponentLayout: FC<AssignComponentLayoutProps> = (props) => {
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

    const assignBtnContent = isAssigning ? <Spinner /> : 'Назначить';

    return (
        <div className="text-center">
            <SearchBar
                className={styles.search}
                onSearch={onSearch}
            />
            {isUsersLoading && <Spinner className={styles.spinner} />}
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
