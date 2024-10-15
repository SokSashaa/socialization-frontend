import { useParams } from 'react-router-dom';
import { TestEditor } from '../../modules/EditTest';

const EditTest = () => {
  const { id } = useParams();

  return <TestEditor id={id} />;
};

export default EditTest;
