import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useGetTestQuery } from '../../../../app/api/common/testApiSlice';
import { usePassTestMutation } from '../../api/passTestApiSlice';

import {
  SpinnerBig,
  ErrorMessage,
  Container,
  Button,
  SpinnerMini,
  TestHeader,
} from '../../../../UI';
import QuestionItem from '../QuestionItem/QuestionItem';

import { createValidationShema } from '../../utils/validation.helper';
import { transformAnswers } from '../../utils/data.helper';
import styles from './TestForm.module.css';

const TestForm = ({ testId, userId }) => {
  const { data: test, isLoading: isTestLoading, isError: isErrorGetTest } = useGetTestQuery(testId);

  const [passTest, { isLoading: isLoadingPassTest }] = usePassTestMutation();

  const navigate = useNavigate();

  const initValues = {};

  if (isTestLoading) {
    return <SpinnerBig className="mt-10" />;
  }

  if (isErrorGetTest) {
    return (
      <ErrorMessage
        message="Ошибка загрузки теста"
        className="mt-10"
      />
    );
  }

  if (test) {
    test.questions.forEach((q) => {
      initValues[q.id] = q.type === 'checkbox' ? [] : '';
    });
  }

  const sendBtnText = isLoadingPassTest ? <SpinnerMini /> : 'Отправить';

  const onSubmit = async (values) => {
    const testRes = { test_id: +testId, user_id: userId, answers: transformAnswers(values) };

    try {
      await passTest(testRes).unwrap();
      toast.success('Тест пройден');
      navigate('/tests', { replace: true });
    } catch (error) {
      toast.error(error?.data?.detail || 'Что-то пошло не так');
    }
  };

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.inner}>
          <TestHeader
            title={test.title}
            description={test.description}
          />
          <Formik
            initialValues={initValues}
            onSubmit={onSubmit}
            validationSchema={createValidationShema(test?.questions || [])}
          >
            {({ handleSubmit }) => (
              <Form
                method="post"
                className={styles.form}
              >
                {test.questions.map((question) => (
                  <QuestionItem
                    key={question.id}
                    question={question}
                  />
                ))}
                <div className={styles.bottomForm}>
                  <Button
                    type="submit"
                    disabled={isLoadingPassTest}
                    onClick={handleSubmit}
                  >
                    {sendBtnText}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  );
};

export default TestForm;
