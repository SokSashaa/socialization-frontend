import { useParams, useLocation } from 'react-router-dom';
import { TestResult } from '../../modules/ResultTest';

const ResultTest = () => {
  const { id } = useParams();
  const location = useLocation();
  const userId = location.state?.userId;

  return (
    <TestResult
      testId={id}
      userId={userId}
    />
  );
};

export default ResultTest;
