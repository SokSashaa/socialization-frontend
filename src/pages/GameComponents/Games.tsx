import { ComponentList } from '@modules/ComponentList';

import { useAppSelector } from '@hooks/redux';

function Tests() {
    const currentUser = useAppSelector((state) => state.auth?.user);

    return (
        <ComponentList
            currentUser={currentUser}
            listType="games"
        />
    );

    // return (
    //     <>
    //         {currentUser && <ComponentsListGames currentUser={currentUser} listType={listType.games}/>} //TODO: Компонент выделен, но нужно проверять как работает
    //     </>
    // )
}

export default Tests;
