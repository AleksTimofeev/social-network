import React from 'react';
import styles from './Header.module.css'
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {logout} from "../../features/auth/authReducer";
import {Avatar} from "antd";
import {UserOutlined} from '@ant-design/icons';
import { Button } from 'antd';


const Header = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const login = useAppSelector(state => state.auth.authMeData.login)
  const avatar = useAppSelector(state => state.profile.profileData.photos)
  const avatarImg = () => {
    if(avatar.small){
      return <img src={avatar.small} alt={'avatar'} />
    }if(avatar.large){
      return <img src={avatar.large} alt={'avatar'} />
    }else{
      return <UserOutlined/>
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }
  const handleLogin = () => {
    navigate('login')
  }

  return (
    <div className={styles.header}>
      <Avatar size={48}
              icon={
                avatarImg()
              }
              className={styles.avatar}/>
      <h4 className={styles.userName}>
        {login}
      </h4>
      {login ?
        <Button type="default"
          className={styles.buttons}
          onClick={handleLogout}
        >Logout</Button> :
        <Button type="default"
          className={styles.buttons}

          onClick={handleLogin}
        >Login</Button>
      }
    </div>
  );
};

export default Header;