import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../modules/Auth';
import { ComponentList } from '../../modules/ComponentList';

function Tests() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <ComponentList
      currentUser={currentUser}
      listType="tests"
    />
  );
}

export default Tests;
