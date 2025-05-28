import {game_dto} from '@dto/games/game.dto';
import {paginationRequest, paginationResponse} from '@dto/pagination.dto';

export type getObserverGamesRequest = {
	user_id: number;
	search?: string;
} & paginationRequest;

export type getObserverGamesResponse = {
	results: game_dto[];
} & paginationResponse;
