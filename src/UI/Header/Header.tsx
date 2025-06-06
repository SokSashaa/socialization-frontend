import {useRef, useState} from 'react';
import React from 'react';
import {useSelector} from 'react-redux';
import {NavLink, useLocation} from 'react-router-dom';
import clsx from 'clsx';

import {selectCurrentUser} from '@modules/Auth';

import UserIcon from '@assets/icons/user-icon.svg';
import {burgerMenu, closeMenu} from '@assets/index';

import {links} from './NavData';

import styles from './Header.module.scss';

function Header() {
	const currentUser = useSelector(selectCurrentUser);
	const [isMobileVisible, setIsMobileVisible] = useState(false);
	const header = useRef<HTMLDivElement>(null);
	const location = useLocation();

	const handleMenuClick = () => {
		setIsMobileVisible((value) => !value);
		if (header.current && 'style' in header.current) {
			if (isMobileVisible) {
				header.current.style.display = 'none';
			} else {
				header.current.style.display = 'flex';
			}
		}
	};

	return (
		<div>
			<div className={styles.burgerMenu}>
				<img
					alt="Меню"
					src={isMobileVisible ? closeMenu : burgerMenu}
					className={styles.menuIcon}
					role="presentation"
					onClick={() => handleMenuClick()}
				/>
			</div>
			<div ref={header} className={styles.header}>
				<div className={styles.navContainer}>
					{currentUser &&
						currentUser.role &&
						links[currentUser.role].map((link) => (
							<NavLink
								key={link.title}
								to={link.path}
								className={clsx(
									styles.navItem,
									location.pathname === link.path && styles.navItemCurrent
								)}
							>
								{link.title}
							</NavLink>
						))}
				</div>
				<div className={styles.userProfile}>
					<NavLink to="/profile">
						{currentUser?.photo ? (
							<div className={styles.photoWrapper}>
								<img className={styles.photo} src={currentUser?.photo} alt="user" />
							</div>
						) : (
							<img src={UserIcon} alt="user" />
						)}
					</NavLink>
				</div>
			</div>
		</div>
	);
}

export default Header;
