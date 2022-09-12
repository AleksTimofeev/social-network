import React, {useEffect} from 'react';
import styles from './header.module.css'
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import Navigation from "./Navigation/Navigation";
import {useLocation, useParams} from "react-router-dom";

const Header = () => {

  const p = useLocation()
  const title = p.pathname.split('').filter(e => e !== '/').join('')

  return (
    <div className={styles.headerWrapper}>
      <AppBar position="static">
        <Toolbar>
          <Navigation />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title.length ? title : 'home'}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;