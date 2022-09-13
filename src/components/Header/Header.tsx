import React from 'react';
import styles from './header.module.css'
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import Navigation from "./Navigation/Navigation";
import {useSelector} from "react-redux";
import {AppStateType} from "../../store";

const Header = () => {

  const login = useSelector((state: AppStateType) => state.auth.login)
  const isLogged = useSelector((state: AppStateType) => state.auth.isLogged)

  const handleLogout = () => {}
  const handleLogin = () => {}

  return (
    <div className={styles.headerWrapper}>
      <AppBar position="static">
        <Toolbar>
          <Navigation/>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            {login}
          </Typography>
          {isLogged ?
            <Button color="inherit"
                    onClick={handleLogout}
            >Logout</Button> :
            <Button color="inherit"
                    onClick={handleLogin}
            >Login</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;