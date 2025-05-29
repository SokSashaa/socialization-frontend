import {game_dto} from '@dto/games/game.dto';

export type AddGameDtoResponse = {
	success: boolean;
	result: game_dto;
};

export type AddGameDtoRequest = {
	archive_file: string;
} & Omit<game_dto, 'id' | 'link'>;
