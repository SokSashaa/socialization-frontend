export type assignTestRequestDto = {
	test_id: number;
	link: (string | number)[];
	unlink: (string | number)[];
};

export type assignTestResponseDto = {
	success: boolean;
	message: string;
};
