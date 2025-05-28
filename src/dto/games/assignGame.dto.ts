export type assignGameRequestDto = {
	game_id: number;
	link: (string | number)[];
	unlink: (string | number)[];
};

export type assignGameResponseDto = {
	success: boolean;
	message: string;
};
