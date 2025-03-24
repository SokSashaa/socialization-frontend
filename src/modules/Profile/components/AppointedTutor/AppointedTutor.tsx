import { FC } from 'react';
import css from '../ProfileInfoForm/ProfileInfo.module.scss';
import ItemUser from '../ProfileInfoForm/ItemUser/ItemUser';
import { useGetTutorByObservedQuery } from '../../../../app/api/common/usersApiSlice';

interface AppointedTutorProps {
    user_id: string;
}

const AppointedTutor: FC<AppointedTutorProps> = ({ user_id }) => {
    const { data: tutor } = useGetTutorByObservedQuery(user_id);
    return (
        <>
            {tutor && (
                <>
                    <h3 className={css.title}>Назначенный тьютор:</h3>
                    <ItemUser user={tutor} />
                </>
            )}
        </>
    );
};

export default AppointedTutor;
