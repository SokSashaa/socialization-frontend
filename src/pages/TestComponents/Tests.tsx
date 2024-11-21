import {useAppSelector} from "../../hooks/redux";
import {listType} from "../../modules/ComponentList/components/ComponentList/ComponentList";
import ComponentListTests from "../../components/ComponentListTests/ComponentListTests";
import {ComponentList} from "../../modules/ComponentList";

function Tests() {
    const currentUser = useAppSelector(state => state.auth?.user)

    return (
        <>
            {
                currentUser && <ComponentList
                    currentUser={currentUser}
                    listType={'tests'}/>
            }

            {/*{ //TODO: Лучше использовать ComponentList, в котором будет ListTest или ListGames МОДАЛКА ТУТ НЕ РАБОТАЕТ СОЗДАНИЯ. ПОЛНЫЙ КОНЕЦ*/}
            {/*    currentUser && <ComponentListTests currentUser={currentUser} listType={listType.tests}/>*/}
            {/*}*/}

        </>
    )

}

export default Tests;
