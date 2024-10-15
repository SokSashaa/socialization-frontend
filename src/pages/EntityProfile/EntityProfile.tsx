import { useParams } from 'react-router-dom';
import { useGetSingleUserQuery } from '../../app/api/common/usersApiSlice';
import { SpinnerBig, ErrorMessage } from '../../UI';
import { ROLES } from '../../utils/constants';
import { ObservedTests } from '../../modules/ObservedTests';
import { ObservedGames } from '../../modules/ObservedGames';
import { ObservedListV2 } from '../../modules/ObservedListV2';

const EntityProfile = () => {
  const { id } = useParams();

  const { data: user, isLoading, isError, isFetching } = useGetSingleUserQuery(id);

  if (isLoading || isFetching) {
    return <SpinnerBig className="mt-7" />;
  }

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
      {user.role === ROLES.observed.code && <ObservedTests userId={id} />}
      {user.role === ROLES.observed.code && <ObservedGames userId={id} />}
      {user.role === ROLES.tutor.code && <ObservedListV2 userId={id} />}
    </>
  );
};

export default EntityProfile;
