import React from 'react';
import styles from './Header.module.css'
import Navigation from "../navigation/Navigation";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {logout} from "../../features/auth/authReducer";

const Header = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const login = useAppSelector(state => state.auth.authMeData.login)

  const handleLogout = () => {dispatch(logout())}
  const handleLogin = () => {
    navigate('login')
  }

  return (
    <div className={styles.headerWrapper}>
      <div>
        <div>
          <Navigation/>
          <h4>
            {login}
          </h4>
          {login ?
            <button
                    onClick={handleLogout}
            >Logout</button> :
            <button
                    onClick={handleLogin}
            >Login</button>
          }
        </div>
      </div>
    </div>
  );
};

export default Header;