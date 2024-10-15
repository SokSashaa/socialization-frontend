import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetObservedsQuery,
  useAppointObservedsMutation,
} from '../../../../app/api/common/usersApiSlice';
import AssignTutorModalLayout from '../AssignTutorModalLayout/AssignTutorModalLayout';
import { Modal, ModalLayout } from '../../../../UI';

const AssignTutorModal = ({ showModal, setShowModal, currentObserved, tutorId }) => {
  const [selectedObs, setSelectedObs] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const {
    isLoading: isObsLoading,
    isError: isObsError,
    isFetching: isObsFetching,
    data: observeds,
    isSuccess,
  } = useGetObservedsQuery({ text: searchValue.trim() }, { skip: !showModal });

  const [appointObserveds, { isLoading: isAppointLoading }] = useAppointObservedsMutation();

  let availableObs = [];

  const onAssign = async () => {
    try {
      await appointObserveds({
        link: selectedObs,
        tutor_id: +tutorId,
      }).unwrap();

      toast.success('Успешно!');
    } catch (error) {
      toast.error(error?.data?.detail || 'Что-то пошло не так');
    }
  };

  const onSelectObs = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setSelectedObs((prev) => [...prev, +value]);
    } else {
      setSelectedObs((prev) => prev.filter((id) => id !== +value));
    }
  };

  const onClose = () => {
    setSelectedObs([]);
  };

  const onSearch = (query) => {
    setSearchValue(query);
  };

  if (isSuccess) {
    availableObs = observeds.filter(
      (obs) => !currentObserved.some((curObs) => curObs.id === obs.id),
    );
  }

  return (
    <Modal
      active={showModal}
      setActive={setShowModal}
      handleClose={onClose}
    >
      <ModalLayout
        title="Назначить наблюдаемого"
        content={
          // eslint-disable-next-line
          <AssignTutorModalLayout
            selectedObs={selectedObs}
            observeds={availableObs}
            isObservedsLoading={isObsLoading || isObsFetching}
            isError={isObsError}
            onSearch={onSearch}
            onAssign={onAssign}
            onSelectObs={onSelectObs}
            isAssigning={isAppointLoading}
          />
        }
      />
    </Modal>
  );
};

export default AssignTutorModal;
