import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { user_dto } from '@dto/user.dto';

import { ROUTING_FUNCTIONS } from '@routes/RouterConfig';

import css from './ItemUser.module.scss';

interface ItemUserProps {
    user: Partial<user_dto>;
}

const ItemUser: FC<ItemUserProps> = ({ user }) => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        if (user.id) {
            navigate(ROUTING_FUNCTIONS.entityProfile(user.id));
        }
    };

    return (
        <div className={css.root}>
            <p className={css.fullName}>{user.name + ' ' + user.second_name}</p>
            <p
                className={css.button}
                onClick={handleOnClick}
            >
                Перейти в профиль
            </p>
        </div>
    );
};

export default ItemUser;
