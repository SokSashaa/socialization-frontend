import { BaseResponseType } from '@app/api/common/types';
import { imageTransformResponseArray } from '@app/api/common/utils/transformResponsePhoto';

import { game_dto } from '@dto/game.dto';

import { apiSlice } from '../apiSlice';

const gameApiSlice = apiSlice.injectEndpoints?.({
    endpoints: (builder) => ({
        getGames: builder.query<game_dto[], { search: string; sort: string }>({
            query: (params) => {
                const { search, sort } = params;

                return {
                    url: '/games_list/',
                    params: {
                        search,
                        ordering: sort,
                    },
                };
            },
            providesTags: ['Games'],
            transformResponse: (response: BaseResponseType<game_dto>) =>
                imageTransformResponseArray<game_dto>(response.results, 'icon'),
        }),
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

export const { useGetGamesQuery, useGetGameQuery, useGetObserverGamesQuery } = gameApiSlice;
