import { Modal, ModalLayout } from '../../../../UI';

// TODO: доделать этот компонент

const AddGameModal = ({ toggleModal, showModal, setShowModal }) => {

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
              <div>Пока недоступно</div>
            }
          />
        </Modal>
      )}
    </div>
  );
};

export default AddGameModal;
