export const ROUTES = {
    home: '/',
    users: '/users',
    games: '/games',
    tests: '/tests',
    editTest: '/tests/:id/edit',
    profile: '/profile',
    auth: '/auth',
    unauthorized: '/unauthorized',
    passingTest: '/tests/:id/pass',
    resultTest: '/tests/:id/result',
    playingGame: '/games/:id/play',
    myObservers: '/my-observers',
    entityProfile: '/users/:id',
    organization: '/organizations',
    organizationEdit: '/organizations/:id/edit',
};

type RoutingFunctionsType = { [k: string]: (value: string) => string };

export const ROUTING_FUNCTIONS: RoutingFunctionsType = {
    editTest: (id: string) => `/tests/${id}/edit/`,
    resultTest: (id: string) => `/tests/${id}/result/`,
    entityProfile: (id: string) => `/users/${id}/`,
};
