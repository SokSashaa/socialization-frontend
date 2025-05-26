import {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import {XCircleIcon} from '@heroicons/react/24/solid';

import ControlModal from '@components/ControlModal/ControlModal';

import {game_dto} from '@dto/game.dto';

import {useModalState} from '@hooks/useModalState';

import {RoleCode, ROLES} from '@utils/constants';

import {defaultGameIcon} from '../../../../assets';
import {ItemListWrapper} from '../../../../UI';
import {selectCurrentUser} from '../../../Auth';
import {useDeleteGamesMutation} from '../../api/gameApiSlice';
import {setSelectedTest} from '../../slice/testsSlice';

import styles from './GameListItem.module.scss';
import IconProfile from '@UI/IconProfile/IconProfile';

// TODO: доделать функционал

interface GameListItemProps {
	game: game_dto;
	toggleModal: () => void;
}

const GameListItem: FC<GameListItemProps> = ({game, toggleModal}) => {
	const [isOpen, open, close] = useModalState(false);

	const {role} = useSelector(selectCurrentUser);

	const [deleteGames] = useDeleteGamesMutation();

	const dispatch = useDispatch();

	const onSelectGame = (id: string) => () => {
		dispatch(setSelectedTest(id));
		toggleModal();
	};

	// const onArchive = (id) => async () => {
	//     // TODO: реализовать перемещение игры в архив, полное удаление возможно только оттуда
	// };

	const onDelete = async (id: string) => {
		const toastId = toast.loading('Удаление игры...');

		try {
			await deleteGames(id).unwrap();

			toast.update(toastId, {
				render: 'Игра удалена',
				type: 'success',
				isLoading: false,
				autoClose: 2000,
			});
		} catch (error) {
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
				<IconProfile id={game.id} photo={game.icon} defaultPhoto={defaultGameIcon} />
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
