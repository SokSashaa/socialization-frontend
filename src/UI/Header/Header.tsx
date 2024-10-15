import { useSelector } from "react-redux";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { useCallback, useRef, useState } from "react";
import { selectCurrentUser } from "../../modules/Auth";
import { links } from "./NavData";
import UserIcon from "../../assets/icons/user-icon.svg";
import styles from "./Header.module.scss";
import { burgerMenu, closeMenu } from "../../assets";

function Header() {
  const currentUser = useSelector(selectCurrentUser);
  const [isMobileVisible, setIsMobileVisible] = useState(false);
  const header = useRef(null);

  // const menuItemClasses = ({ isActive }) => clsx(styles.navItem, { [styles.navItemCurrent]: isActive }); //useMemo

  const handleMenuClick = useCallback(() => {
    setIsMobileVisible((value) => !value);
    if(header.current && "style" in header.current){
      if (isMobileVisible) {header.current.style.display = "none";}
      else header.current.style.display = "flex";
    }

  }, []);

  return (
    <div>
      <div className={styles.burgerMenu}>
        <img
          alt="иконка меню"
          src={isMobileVisible ? closeMenu : burgerMenu}
          className={styles.menuIcon}
          onClick={() => handleMenuClick()}
          role="presentation"
        />
      </div>
      <div
        ref={header}
        className={styles.header}
      >
        <div className={styles.navContainer}>
          {currentUser &&
            links[currentUser.role].map((link) => (
              <NavLink
                key={link.title}
                to={link.path}
                className={styles.navItem} //menuItemClasses
              >
                {link.title}
              </NavLink>
            ))}
        </div>
        <div className={styles.userProfile}>
          <NavLink to="/profile">
            {currentUser?.photo ? (
              <div className={styles.photoWrapper}>
                <img
                  className={styles.photo}
                  src={currentUser?.photo}
                  alt="user"
                />
              </div>
            ) : (
              <img
                src={UserIcon}
                alt="user"
              />
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;
