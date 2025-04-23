import { apiSlice } from '@app/api/apiSlice';

// TODO: подружить все это дело с сервером, доделать методы

const gameApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Переместить игру в архив
        moveToArchiveGame: builder.mutation({
            query: (id) => ({
                // TODO: реализовать метод
            }),
            invalidatesTags: ['Games'],
        }),
        // Удалить игру
        deleteGames: builder.mutation({
            query: (id) => ({
                url: `/games_list/${id}/delete_game/`,
                method: 'POST',
            }),
            invalidatesTags: ['Games'],
        }),
        // Добавить игру
        addGame: builder.mutation({
            query: (game) => ({
                url: '/games/create_game/',
                method: 'POST',
                body: game,
            }),
            transformResponse: (response) => response.result.id,
            invalidatesTags: ['Games'],
        }),
        // Назначить игру
        assignGame: builder.mutation({
            query: (data) => ({
                url: '/games_list/appoint_game/',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Observeds', 'ObservedGames'],
        }),
    }),
});

export const {
    useMoveToArchiveGameMutation,
    useDeleteGamesMutation,
    useAddGameMutation,
    useAssignGameMutation,
} = gameApiSlice;
