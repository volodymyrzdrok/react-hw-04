import React from "react";

import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className="container">
        {" "}
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
    </div>
  );
};

export default Header;
