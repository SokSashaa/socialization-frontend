import { Form } from 'formik';
import { InputText, Button } from '../../../../UI';
import styles from './CreateTestForm.module.scss';

const CreateTestForm = ({ isSubmitting, handleSubmit }) => {
  const submitBtnContent = isSubmitting ? 'Добавление...' : 'Добавить';

  return (
    <Form
      method="post"
      className={styles.creationForm}
    >
      <InputText
        wrapperClassNames="h-[115px]"
        name="title"
        type="text"
        label="Название"
        maxlength={60}
      />
      <InputText
        wrapperClassNames="h-auto"
        className="h-[185px]"
        as="textarea"
        name="description"
        type="text"
        label="Описание"
        maxlength={300}
      />
      <Button
        className={styles.createButton}
        disabled={isSubmitting}
        onClick={handleSubmit}
        type="submit"
      >
        {submitBtnContent}
      </Button>
    </Form>
  );
};

export default CreateTestForm;
