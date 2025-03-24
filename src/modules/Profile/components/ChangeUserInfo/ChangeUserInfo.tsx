import { FC } from 'react';
import {
    useGetSingleUserQuery,
    useGetTutorByObservedQuery,
} from '../../../../app/api/common/usersApiSlice';
import { useParams } from 'react-router-dom';
import { useModalState } from '../../../../hooks/useModalState';
import { ROLES } from '../../../../utils/constants';
import ChangePasswordModal from '../ChangePasswordModal/ChangePasswordModal';
import { Portal } from '../../../../components';
import WrapperProfileInfo from '../WrapperProfileInfo/WrapperProfileInfo';
import { initialValuesType } from '../WrapperProfileInfo/types';

const ChangeUserInfo: FC = () => {
    const { id } = useParams();

    const { data: user, isFetching, isLoading, isError } = useGetSingleUserQuery(id!);
    const { data: tutor, isError: isErrorTutor } = useGetTutorByObservedQuery(id!); //TODO: Исправить бы тут, запрос чисто на то, чтобы ид тютора выцепить. Проверку может какую то

    const [isOpen, open, close] = useModalState(false);

    const tutor_id = () => {
        if (user?.role !== ROLES.observed.code && !isErrorTutor) {
            return '';
        }
        if (tutor) {
            return tutor.id;
        }
        return '';
    };

    const initialValues: initialValuesType = {
        name: user?.name || '',
        patronymic: user?.patronymic || '',
        second_name: user?.second_name || '',
        birthday: user?.birthday || '2022-01-01',
        email: user?.email || '',
        photo: user?.photo || '',
        role: {
            code: user?.role || ROLES.observed.code,
            tutor_id: tutor_id(),
        },
        organization: user?.organization,
    };

    return (
        <>
            {user && (
                <WrapperProfileInfo
                    user={user}
                    initialValues={initialValues}
                    isLoading={isLoading}
                    isFetching={isFetching}
                    isError={isError}
                    open={open}
                />
            )}
            <Portal>
                <ChangePasswordModal
                    showModal={isOpen}
                    setShowModal={close}
                    admin
                />
            </Portal>
        </>
    );
};

export default ChangeUserInfo;
