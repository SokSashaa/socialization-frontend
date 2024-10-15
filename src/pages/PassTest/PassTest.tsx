import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectCurrentUser } from '../../modules/Auth';
import { TestForm } from '../../modules/PassTest';

const PassTest = () => {
  const { id } = useParams();
  const user = useSelector(selectCurrentUser);

  return (
    <TestForm
      testId={id}
      userId={user?.id}
    />
  );
};

export default PassTest;
