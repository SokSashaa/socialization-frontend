import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLazyGetObservedsQuery } from '../../../../app/api/common/usersApiSlice';
import { useAssignTestMutation } from '../../api/testApiSlice';
import { useAssignGameMutation } from '../../api/gameApiSlice';
import AssignComponentLayout from '../AssignComponentLayout/AssignComponentLayout';
import { Modal, ModalLayout } from '../../../../UI';

const AssignComponentModal = ({ showModal, setShowModal, componentId, listType, component }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [
    getObserveds,
    { isLoading: isUsersLoading, isFetching: isUsersFetching, isError: isUsersError, data: users },
  ] = useLazyGetObservedsQuery();

  const useAssignMutationHook =
    listType === 'tests' ? useAssignTestMutation : useAssignGameMutation;

  const [assignComponent, { isLoading: isAssignComponentLoading }] = useAssignMutationHook();

  useEffect(() => {
    const onObservedsRequest = async (params) => {
      try {
        const observeds = await getObserveds(params).unwrap();

        const selectedObserved = observeds
          .filter(
            ({ tests, games }) =>
              (listType === 'tests' ? tests : games).some(
                (entity) => entity[listType === 'tests' ? 'test' : 'game'].id === componentId,
              ),
            // eslint-disable-next-line
          )
          .map((u) => u.id);

        setSelectedUsers(selectedObserved);
      } catch (error) {
        console.error(error);
      }
    };

    if (showModal) {
      onObservedsRequest({ text: '' });
    }
  }, [showModal]);

  const onSelectUser = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setSelectedUsers((prev) => [...prev, +value]);
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== +value));
    }
  };

  const onClose = () => {
    setSelectedUsers([]);
  };

  const onAssign = async () => {
    try {
      const unlinkUsers = users.filter((u) => !selectedUsers.includes(u.id)).map((u) => u.id);

      if (listType === 'tests') {
        await assignComponent({
          test_id: componentId,
          link: selectedUsers,
          unlink: unlinkUsers,
        }).unwrap();
      } else if (listType === 'games') {
        await assignComponent({
          game_id: componentId,
          link: selectedUsers,
          unlink: unlinkUsers,
        }).unwrap();
      }

      toast.success('Успешно!');
    } catch (error) {
      toast.error(error?.data?.detail || 'Что-то пошло не так');
    }
  };

  const onSearch = (isModalShowed) => async (query) => {
    if (isModalShowed) {
      await getObserveds({ text: query.trim() });
    }
  };

  return (
    <Modal
      active={showModal}
      setActive={setShowModal}
      handleClose={onClose}
    >
      <ModalLayout
        title={`Назначить/отвязать ${listType === 'tests' ? 'тест' : 'игру'} наблюдаемым`}
        content={
          // eslint-disable-next-line
          <AssignComponentLayout
            onAssign={onAssign}
            selectedUsers={selectedUsers}
            onSelectUser={onSelectUser}
            onSearch={onSearch(showModal)}
            users={users}
            isError={isUsersError}
            isUsersLoading={isUsersLoading || isUsersFetching}
            isAssigning={isAssignComponentLoading}
          />
        }
      />
    </Modal>
  );
};

export default AssignComponentModal;
