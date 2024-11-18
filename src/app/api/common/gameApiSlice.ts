import { apiSlice } from '../apiSlice';

const gameApiSlice = apiSlice.injectEndpoints?.({
  endpoints: (builder) => ({
    getGame: builder.query({
      query: (id) => `/games_list/${id}/`,
      keepUnusedDataFor: 0.1,
    }),
    getObserverGames: builder.query({
      query: (params) => {
        const { id } = params;
        return {
          url: `/games_list/${id}/get_obs_games/`,
        };
      },
      transformResponse: (response) => response.results,
      providesTags: ['ObservedGames'],
    }),
  }),
});

export const { useGetGameQuery, useGetObserverGamesQuery } = gameApiSlice;
