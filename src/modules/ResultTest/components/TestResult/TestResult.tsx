import { useGetResultTestQuery } from '../../api/resultTestApiSlice';
import {  ErrorMessage, Container, TestHeader } from '../../../../UI';
import TestResultFooter from '../TestResultFooter/TestResultFooter';
import QuestionItem from '../QuestionItem/QuestionItem';
import styles from './TestResult.module.css';
import Spinner from "../../../../UI/spinners/Spinner";

const TestResult = ({ testId, userId }) => {
  const {
    data: test,
    isError,
    isLoading,
    isFetching,
  } = useGetResultTestQuery({
    test_id: testId,
    user_id: userId,
  });

  if (isLoading || isFetching) {
    return <Spinner typeSpinner={'big'}  className="mt-10" />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message="Ошибка загрузки теста"
        className="mt-10"
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.inner}>
          <TestHeader
            title={test.title}
            description={test.description}
          />
          {test.questions.map((question) => (
            <QuestionItem
              key={question.id}
              question={question}
            />
          ))}
          <TestResultFooter test={test} />
        </div>
      </Container>
    </div>
  );
};

export default TestResult;
