import React from "react";

import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.header}>
      <NavLink
        exact
        to="/"
        activeClassName={styles.linkMenuActive}
        className={styles.linkMenu}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        activeClassName={styles.linkMenuActive}
        className={styles.linkMenu}
      >
        Movies
      </NavLink>
    </div>
  );
};

export default Header;
