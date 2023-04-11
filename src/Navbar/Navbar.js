import React from "react";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";


function Navbar() {
  return (
    <nav className={classes.navbar}>
      <NavLink to="/" exact activeClassName={classes.active}>
        SignUp👨🏼‍💻
      </NavLink>

      <NavLink to="/login" activeClassName={classes.active}>
        Login👨🏻‍💻
      </NavLink>
    </nav>
  );
}

export default Navbar;
