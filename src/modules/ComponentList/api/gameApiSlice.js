import { apiSlice } from '../../../app/api/apiSlice';

// TODO: подружить все это дело с сервером, доделать методы

const gameApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Получить игры для старшего наставника
    getGames: builder.query({
      query: (params) => {
        const { search, sort } = params;
        return {
          url: '/games/',
          params: {
            search,
            ordering: sort,
          },
        };
      },
      providesTags: ['Games'],
      transformResponse: (response) => response.results,
    }),
    // Получить игры для наблюдаемого
    getObserverGames: builder.query({
      query: (params) => {
        const { id } = params;
        return {
          url: `/games/${id}/get_user_games/`,
        };
      },
      transformResponse: (response) => response.result.games,
    }),
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
        url: `/games/${id}/`,
        method: 'DELETE',
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
        url: '/games/appoint_game/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Observeds'],
    }),
  }),
});

export const {
  useGetGamesQuery,
  moveToArchiveGame,
  useDeleteGameMutation,
  useAddGameMutation,
  useAssignGameMutation,
  useGetObserverGamesQuery,
} = gameApiSlice;
