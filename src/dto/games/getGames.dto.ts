import {game_dto} from '@dto/games/game.dto';
import {paginationRequest, paginationResponse} from '@dto/pagination.dto';

export type gameSortListValuesType = 'id' | 'name';

export const gameSortList = [
	{
		label: 'По умолчанию',
		value: 'id',
	},
	{
		label: 'По имени (А-Я)',
		value: 'name',
	},
];
export type getGamesRequest = {
	search: string;
	ordering: gameSortListValuesType;
} & paginationRequest;

export type getGamesResponse = {
	results: game_dto[];
} & paginationResponse;
