import React from 'react';
import {NavLink} from "react-router-dom";
import styles from './Navigation.module.css'
import {NavMenu} from "./navMenu/NavMenu";

const Navigation = () => {

  const style = (isActive: boolean) => {
    return `${isActive ? styles.activeLink : ''} ${styles.link}`
  }

  return (
    <div className={styles.navigation}>

      <NavMenu />

    </div>
  );
}
export default Navigation