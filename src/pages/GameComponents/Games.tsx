import {useSelector} from 'react-redux';
import {selectCurrentUser} from '../../modules/Auth';
import {useAppSelector} from "../../hooks/redux";
import ComponentsListGames from "../../components/ComponentListGames/ComponentsListGames";
import {listType} from "../../modules/ComponentList/components/ComponentList/ComponentList";

function Tests() {
    const currentUser = useAppSelector(state => state.auth?.user)

    // return (
    //   <ComponentList
    //     currentUser={currentUser}
    //     listType="games"
    //   />
    // );

    return (
        <>
            {currentUser && <ComponentsListGames currentUser={currentUser} listType={listType.games}/>}
        </>
    )
}

export default Tests;
