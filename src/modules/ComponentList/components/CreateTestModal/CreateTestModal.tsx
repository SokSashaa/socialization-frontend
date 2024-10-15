import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAddTestMutation } from '../../api/testApiSlice';
import { Modal, ModalLayout } from '../../../../UI';

import CreateTestForm from '../CreateTestForm/CreateTestForm';
import { newTestSchema } from '../../utils/validation.helper';

const CreateTestModal = ({ toggleModal, showModal, setShowModal }) => {
  const initialState = {
    title: '',
    description: '',
    questions: [],
  };

  const [addTest] = useAddTestMutation();

  const navigate = useNavigate();

  const onSubmit = async (values, { resetForm }) => {
    try {
      const testId = await addTest(values).unwrap();

      resetForm({ values: initialState });
      toggleModal();
      navigate(`/tests/${testId}/edit`);
    } catch (error) {
      toast.error(error?.data?.detail || 'Что-то пошло не так');
    }
  };

  return (
    <Formik
      initialValues={initialState}
      validationSchema={newTestSchema}
      onSubmit={onSubmit}
    >
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
              <CreateTestForm
                isSubmitting={isSubmitting}
                handleSubmit={handleSubmit}
              />
            }
          />
        </Modal>
      )}
    </Formik>
  );
};

export default CreateTestModal;
