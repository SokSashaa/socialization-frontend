import {FC} from "react";
import {user_dto} from "../../../../../dto/user.dto";

import css from './ItemUser.module.scss'
import {useNavigate} from "react-router-dom";

interface ItemUserProps {
    user: Partial<user_dto>
}

const BASE_USER_PATH = '/users/';

const ItemUser: FC<ItemUserProps> = ({user}) => {
    const navigate = useNavigate()

    const userPath = BASE_USER_PATH + user.id;

    const handleOnClick = () => {
        navigate(userPath)
    }

    return (
        <div className={css.root}>
            <p className={css.fullName}>{user.name + ' ' + user.second_name}</p>
            <p className={css.button} onClick={handleOnClick}>Перейти в профиль</p>
        </div>
    )
}

export default ItemUser;
