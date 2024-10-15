import { Modal, ModalLayout } from '../../../../UI';

// TODO: доделать этот компонент

const AddGameModal = ({ toggleModal, showModal, setShowModal }) => {
  const initialState = {
    title: '',
    description: '',
    questions: [],
  };

  return (
    <div>
      {({ isSubmitting, handleSubmit, handleReset }) => (
        <Modal
          active={showModal}
          setActive={setShowModal}
          handleClose={handleReset}
        >
          <ModalLayout
            title="Создание теста"
            content={
              // eslint-disable-next-line
              <div>Пока недоступно</div>
            }
          />
        </Modal>
      )}
    </div>
  );
};

export default AddGameModal;
