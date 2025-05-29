import {imageTransformResponseArray} from '@app/api/common/utils/transformResponsePhoto';

import {AddGameDtoRequest, AddGameDtoResponse} from '@dto/games/addGame.dto';
import {assignGameRequestDto, assignGameResponseDto} from '@dto/games/assignGame.dto';
import {game_dto} from '@dto/games/game.dto';
import {getGamesRequest, getGamesResponse} from '@dto/games/getGames.dto';
import {getObserverGamesRequest, getObserverGamesResponse} from '@dto/games/getObserverGames.dto';

import {apiSlice} from '../apiSlice';

const gameApiSlice = apiSlice.injectEndpoints?.({
	endpoints: (builder) => ({
		getGames: builder.query<getGamesResponse, getGamesRequest>({
			query: (params) => ({
				url: '/games_list/',
				params,
			}),
			providesTags: ['Games'],
			transformResponse: (response: getGamesResponse) => {
				const res = imageTransformResponseArray<game_dto>(response.results, 'icon');

				return {
					...response,
					results: res,
				};
			},
		}),
		getGame: builder.query({
			query: (id) => `/games_list/${id}/`,
			keepUnusedDataFor: 0.1,
		}),
		getObserverGames: builder.query<getObserverGamesResponse, getObserverGamesRequest>({
			query: (params) => {
				return {
					url: '/games_list/get_obs_games/',
					params,
				};
			},
			providesTags: ['ObservedGames'],
		}),
		// Переместить игру в архив
		moveToArchiveGame: builder.mutation({
			query: () => ({
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
		addGame: builder.mutation<AddGameDtoResponse, AddGameDtoRequest>({
			query: (game) => {
				console.log('game', game);

				return {
					url: '/games_list/upload/',
					method: 'POST',
					body: {
						...game,
					},
				};
			},
			invalidatesTags: ['Games'],
		}),
		// Назначить игру
		assignGame: builder.mutation<assignGameResponseDto, assignGameRequestDto>({
			query: (data) => ({
				url: '/games_list/appoint_game/',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Observeds', 'ObservedGames', 'ObservedsTutor'],
		}),
	}),
});

export const {
	useGetGamesQuery,
	useGetGameQuery,
	useGetObserverGamesQuery,
	useDeleteGamesMutation,
	useAssignGameMutation,
	useAddGameMutation,
} = gameApiSlice;
