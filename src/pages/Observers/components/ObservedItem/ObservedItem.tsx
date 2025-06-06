import React from 'react';
import {Link} from 'react-router-dom';

import {user_dto} from '@dto/users/user.dto';

import {toInitial} from '@utils/helpers';

import {userIconV2} from '../../../../assets';
import {ItemListWrapper} from '../../../../UI';

import styles from './ObservedItem.module.css';

const ObservedItem = ({user}: {user: user_dto}) => {
	const {
id,
name,
photo,
patronymic,
second_name: secondName
} = user;

	return (
		<ItemListWrapper>
			<div className={styles.info}>
				{photo ? (
					<div className={styles.imageWrapper}>
						<img className={styles.image} src={photo} alt="user" />
					</div>
				) : (
					<img src={userIconV2} alt="user" />
				)}
				<div className={styles.text}>
					<p className={styles.name}>
						{`${secondName} ${toInitial(name)} ${toInitial(patronymic)}`}
					</p>
				</div>
			</div>
			<div className={styles.buttons}>
				<Link to={`/users/${id}`} className={styles.button}>
					Профиль
				</Link>
			</div>
		</ItemListWrapper>
	);
};

export default ObservedItem;
