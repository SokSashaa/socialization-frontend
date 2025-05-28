import React, {FC, useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';

import {AddGameModal} from '@pages/Games/components/AddGameModal/AddGameModal';
import {AssignGameModal} from '@pages/Games/components/AssignGamesModal/AssignGamesModal';
import GameListItem from '@pages/Games/components/GameListItem/GameListItem';

import {FilteredList} from '@components/index';

import {ButtonAddItemList, Container} from '@UI/index';

import {game_dto} from '@dto/games/game.dto';
import {gameSortList, getGamesResponse} from '@dto/games/getGames.dto';

import {useAppSelector} from '@hooks/redux';

import {RoleCode, ROLES} from '@utils/constants';

import styles from './GamesList.module.scss';

type GameListProps = {
	isError: boolean;
	isLoading: boolean;
	data?: getGamesResponse;
};

export const DEFAULT_GAMES_PAGINATION_LIMIT = 2;

export const GamesList: FC<GameListProps> = ({isError, isLoading, data}) => {
	const user = useAppSelector((state) => state.auth.user);
	const role = user?.role as RoleCode;

	const [searchParams, setSearchParams] = useSearchParams();
	const [selectedGame, setSelectedGame] = useState<null | number>(null);
	const [modalState, setModalState] = useState<null | 'assign' | 'create'>(null);

	const [count, setCount] = useState(0);
	const pagination = {
		offset: Number(searchParams.get('offset')) || 0,
		limit: Number(searchParams.get('limit')) || DEFAULT_GAMES_PAGINATION_LIMIT,
		count: count,
	};

	useEffect(() => {
		if (data && data.count !== count) {
			setCount(data.count);
		}
	}, [data]);

	const onSort = (value: string) => {
		setSearchParams((prev) => {
			const params = new URLSearchParams(prev);

			if (value) {
				params.set('ordering', value);
			} else {
				params.delete('ordering');
			}

			return params;
		});
	};

	const onSearch = (query: string) => {
		setSearchParams((prev) => {
			const value = query.trim();
			const params = new URLSearchParams(prev);

			if (value) {
				params.set('text', value);
			} else {
				params.delete('text');
			}

			return params;
		});
	};

	const toggleModal = (action: 'assign' | 'create') => {
		if (!modalState) {
			setModalState(action);
		} else {
			setModalState(null);
		}
	};

	return (
		<div className={styles.wrapper}>
			<Container>
				<FilteredList<game_dto>
					isError={isError}
					sortList={role === ROLES.observed.code ? undefined : gameSortList}
					isLoading={isLoading}
					pagination={pagination}
					items={data?.results || []}
					searchBarParamName={'text'}
					renderListItem={(game) => (
						<GameListItem
							game={game}
							setSelectedGame={setSelectedGame}
							openAssignModal={() => toggleModal('assign')}
						/>
					)}
					onSearch={onSearch}
					onSort={onSort}
				>
					{role !== ROLES.observed.code && (
						<ButtonAddItemList onClick={() => toggleModal('create')}>
							Добавить игру
						</ButtonAddItemList>
					)}
				</FilteredList>
			</Container>

			{/*<CreateTestModal*/}
			{/*	isOpenModal={modalState === 'create'}*/}
			{/*	setShowModal={() => setModalState(null)}*/}
			{/*/>*/}
			<AddGameModal
				isOpenModal={modalState === 'create'}
				closeModal={() => setModalState(null)}
			/>
			<AssignGameModal
				setShowModal={setModalState}
				selectedGame={selectedGame}
				showModal={modalState === 'assign'}
			/>
		</div>
	);
};
