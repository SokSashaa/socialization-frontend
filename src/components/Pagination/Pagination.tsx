import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';

export type PaginationStateType = {
	count: number;
	offset: number;
	limit: number;
};

export const useUrlPagination = (initialState: PaginationStateType) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const pagination = {
		offset: Number(searchParams.get('offset')) || initialState.offset,
		limit: Number(searchParams.get('limit')) || initialState.limit,
		count: initialState.count,
	};

	const setPagination = (newPagination: PaginationStateType) => {
		setSearchParams((prev) => {
			const params = new URLSearchParams(prev);
			params.set('offset', newPagination.offset.toString());
			params.set('limit', newPagination.limit.toString());

			return params;
		});
	};

	return {pagination, setPagination};
};

export type PaginationProps = {
	pagination: PaginationStateType;
};

export const Pagination = ({pagination: initialPagination}: PaginationProps) => {
	const {pagination, setPagination} = useUrlPagination(initialPagination);

	const [limitValues, setLimitValues] = useState([1, 2, 3, 5, 10, 25, 50]);
	useEffect(() => {
		if (!limitValues.includes(initialPagination.limit)) {
			setLimitValues([...limitValues, initialPagination.limit].sort((a, b) => a - b));
		}
	}, [initialPagination.limit]);

	return (
		<div className="flex flex-wrap items-center justify-between gap-4 mb-2">
			<div className="flex items-center gap-1 sm:gap-2">
				<button
					disabled={pagination.offset === 0}
					className="px-1.5 py-1 border rounded disabled:opacity-50 sm:px-3"
					onClick={() =>
						setPagination({
							...pagination,
							offset: Math.max(0, pagination.offset - pagination.limit),
						})
					}
				>
					←
				</button>

				{(() => {
					const pageCount = Math.ceil(pagination.count / pagination.limit);
					const currentPage = Math.floor(pagination.offset / pagination.limit);
					const range = (start: number, end: number) =>
						Array.from({length: end - start + 1}, (_, i) => start + i);

					let pages: (number | string)[] = [];
					if (pageCount <= 6) {
						pages = range(0, pageCount - 1);
					} else {
						if (currentPage < 4) {
							pages = [...range(0, 4), '. . .', pageCount - 1];
						} else if (currentPage > pageCount - 4) {
							pages = [0, '. . .', ...range(pageCount - 4, pageCount - 1)];
						} else {
							pages = [
								0,
								'. . .',
								currentPage - 1,
								currentPage,
								currentPage + 1,
								'. . .',
								pageCount - 1,
							];
						}
					}

					return pages.map((page, i) => (
						<button
							key={i}
							disabled={typeof page === 'string'}
							className={`text-nowrap px-1.5 py-1 border rounded sm:px-3 ${
								currentPage === page ? 'bg-neutral-blue text-white' : ''
							} ${typeof page === 'string' ? 'cursor-default' : ''}`}
							onClick={() =>
								typeof page === 'number'
									? setPagination({
											...pagination,
											offset: page * pagination.limit,
										})
									: undefined
							}
						>
							{typeof page === 'number' ? page + 1 : page}
						</button>
					));
				})()}

				<button
					disabled={pagination.offset + pagination.limit >= pagination.count}
					className="px-1.5 py-1 border rounded disabled:opacity-50 sm:px-3"
					onClick={() =>
						setPagination({
							...pagination,
							offset: pagination.offset + pagination.limit,
						})
					}
				>
					→
				</button>
			</div>

			<select
				value={pagination.limit}
				className="border rounded px-1.5 py-1 text-sm sm:px-2 sm:text-base"
				onChange={(e) =>
					setPagination({
						...pagination,
						limit: Number(e.target.value),
						offset: 0,
					})
				}
			>
				{limitValues.map((value) => (
					<option key={value} value={value}>
						{value} на страницу
					</option>
				))}
			</select>
		</div>
	);
};
