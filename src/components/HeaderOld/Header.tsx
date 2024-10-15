import { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { UserCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { mobileLinks, links } from '../../UI/Header/NavData';
import styles from './Header.module.css';

const Header = () => {
  const [active, setActive] = useState(false);

  const onMenuClick = () => {
    setActive((prevActive) => !prevActive);
  };

  const menuBgClasses = clsx(styles.menuClose, {
    [styles.menuOpen]: active,
  });

  const menuListClasses = clsx(styles.list, {
    [styles.listOpen]: active,
  });

  const accountLink = mobileLinks.find((link) => link.title === 'Личный кабинет');

  return (
    <>
      {/* eslint-disable-next-line */}
      <div
        className={menuBgClasses}
        onClick={onMenuClick}
      />
      <header className={styles.header}>
        <div className={styles.containerFluid}>
          <div className={styles.inner}>
            <nav className={styles.nav}>
              <button
                type="button"
                aria-label="открыть Меню"
                className={styles.menuButton}
                onClick={onMenuClick}
              >
                <span />
                <span />
                <span />
              </button>
              <ul className={menuListClasses}>
                <li className={styles.close}>
                  <button
                    aria-label="закрыть Меню"
                    type="button"
                    onClick={onMenuClick}
                  >
                    <XMarkIcon className={styles.icon} />
                  </button>
                </li>
                {links.map((link) => (
                  <li
                    key={link.title}
                    className={styles.item}
                  >
                    <Link
                      to={link.path}
                      className={styles.link}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
                <li className={styles.mobile}>
                  <ul className={styles.mobileList}>
                    {mobileLinks.map((link) => (
                      <li
                        key={link.title}
                        className={styles.mobileItem}
                      >
                        <Link
                          to={link.path}
                          className={styles.mobileLink}
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
            <div className={styles.user}>
              <Link
                to={accountLink.path}
                aria-label={accountLink.title}
              >
                <UserCircleIcon className={`${styles.icon} ${styles.userIcon}`} />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
