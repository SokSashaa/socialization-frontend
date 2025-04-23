import { useParams } from 'react-router-dom';
import { useGetSingleUserQuery } from '../../app/api/common/usersApiSlice';
import { ErrorMessage } from '../../UI';
import { ROLES } from '../../utils/constants';
import { ObservedTests } from '../../modules/ObservedTests';
import { ObservedGames } from '../../modules/ObservedGames';
import { ObservedListV2 } from '../../modules/ObservedListV2';
import Spinner from '../../UI/spinners/Spinner';

const EntityProfile = () => {
    const { id } = useParams();

    const { data: user, isLoading, isError, isFetching } = useGetSingleUserQuery(id);

    if (isError) {
        return (
            <ErrorMessage
                message="Ошибка загрузки профиля"
                className="mt-7"
            />
        );
    }

    return (
        <>
            {isLoading || (isFetching && <Spinner style={{ margin: '10px auto' }} />)}
            {user.role === ROLES.observed.code && <ObservedTests userId={id} />}
            {user.role === ROLES.observed.code && <ObservedGames userId={id} />}
            {user.role === ROLES.tutor.code && <ObservedListV2 userId={id} />}
        </>
    );
};

export default EntityProfile;
