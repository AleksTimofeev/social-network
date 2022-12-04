import React from 'react';
import styles from './header.module.css'
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import Navigation from "./Navigation/Navigation";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {logout} from "../../features/auth/authReducer";

const Header = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const login = useAppSelector(state => state.auth.userData.login)

  const handleLogout = () => {dispatch(logout())}
  const handleLogin = () => {
    navigate('login')
  }

  return (
    <div className={styles.headerWrapper}>
      <AppBar position="static">
        <Toolbar>
          <Navigation/>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            {login}
          </Typography>
          {login ?
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