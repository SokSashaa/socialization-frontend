import {FC} from 'react';
import React from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useDeleteGamesMutation} from '@app/api/common/gameApiSlice';
import {XCircleIcon} from '@heroicons/react/24/solid';

import ControlModal from '@components/ControlModal/ControlModal';

import Avatar from '@UI/Avatar/Avatar';
import {ItemListWrapper} from '@UI/index';

import {game_dto} from '@dto/games/game.dto';

import {useAppSelector} from '@hooks/redux';
import {useModalState} from '@hooks/useModalState';

import {RoleCode, ROLES} from '@utils/constants';

import {defaultGameIcon} from '@assets/index';

import styles from './GameListItem.module.scss';

interface GameListItemProps {
	game: game_dto;
	openAssignModal: () => void;
	setSelectedGame: (id: number) => void;
}

const GameListItem: FC<GameListItemProps> = ({game, openAssignModal, setSelectedGame}) => {
	const [isOpen, open, close] = useModalState(false);
	const user = useAppSelector((state) => state.auth.user);
	const role = user?.role as RoleCode;

	const [searchParams, setSearchParams] = useSearchParams();

	const [deleteGames] = useDeleteGamesMutation();

	const onSelectGame = (id: number) => () => {
		setSelectedGame(id);
		openAssignModal();
	};

	const onDelete = async (id: number) => {
		const toastId = toast.loading('Удаление игры...');

		try {
			await deleteGames(id).unwrap();

			toast.update(toastId, {
				render: 'Игра удалена',
				type: 'success',
				isLoading: false,
				autoClose: 2000,
			});

			setSearchParams((prev) => {
				const params = new URLSearchParams(prev);

				params.delete('offset');

				return params;
			});
			searchParams.delete('offset');
		} catch {
			toast.update(toastId, {
				render: 'Произошла ошибка при удалении игры',
				type: 'error',
				isLoading: false,
				autoClose: 2000,
			});
		}
	};

	const renderGameButtons = (userRole: RoleCode) => {
		switch (userRole) {
			case ROLES.administrator.code:
				return (
					<>
						<Link className={styles.button} to={`/games/${game.id}/play`}>
							Запустить
						</Link>
						<button
							className={styles.button}
							type="button"
							onClick={onSelectGame(game.id)}
						>
							Назначить
						</button>

						<button
							className={styles.close}
							type="button"
							aria-label="Удалить игру"
							onClick={open}
						>
							<XCircleIcon className={styles.icon} />
						</button>
					</>
				);
			case ROLES.tutor.code:
				return (
					<>
						<Link className={styles.button} to={`/games/${game.id}/play`}>
							Запустить
						</Link>
						<button
							className={styles.button}
							type="button"
							onClick={onSelectGame(game.id)}
						>
							Назначить
						</button>
					</>
				);
			case ROLES.observed.code:
				return (
					<Link className={styles.button} to={`/games/${game.id}/play`}>
						Запустить
					</Link>
				);
			default:
				return null;
		}
	};

	return (
		<ItemListWrapper>
			<div className={styles.info}>
				<Avatar id={game.id} photo={game.icon} defaultPhoto={defaultGameIcon} />
				<div className={styles.gameTextInfo}>
					<h3 className={styles.title}>{game.name}</h3>
					<p className={styles.description}>{game.description}</p>
				</div>
			</div>
			<div className={styles.buttons}>{renderGameButtons(role)}</div>
			<ControlModal
				isOpen={isOpen}
				setIsOpen={close}
				onClickNo={close}
				onClickYes={() => onDelete(game.id)}
			>
				<p className={styles.childrenModal}>
					Вы уверены, что хотите удалить игру под названием <span>{game.name}</span>?
				</p>
			</ControlModal>
		</ItemListWrapper>
	);
};

export default GameListItem;
