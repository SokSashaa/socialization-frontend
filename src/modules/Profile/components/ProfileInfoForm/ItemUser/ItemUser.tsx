import { FC } from 'react';
import { Link } from 'react-router-dom';

import { user_dto } from '@dto/users/user.dto';

import { ROUTING_FUNCTIONS } from '@routes/RouterConfig';

import css from './ItemUser.module.scss';

interface ItemUserProps {
    user: Partial<user_dto>;
}

const ItemUser: FC<ItemUserProps> = ({ user }) => {
    const onNavigating = () => {
        if (user.id) {
            return ROUTING_FUNCTIONS.entityProfile(user.id);
        }

        return '0';
    };

    return (
        <div className={css.root}>
            <p className={css.fullName}>{user.name + ' ' + user.second_name}</p>
            <Link
                to={onNavigating()}
                className={css.link}
            >
                Перейти в профиль
            </Link>
        </div>
    );
};

export default ItemUser;
