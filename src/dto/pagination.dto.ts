export type paginationResponse = {
	count: number;
	next?: string | null;
	previous?: string | null;
};

export type paginationRequest = {
	limit?: number;
	offset?: number;
};
