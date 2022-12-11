import React from 'react';
import {UserType} from "../../../api/api";
import styles from './User.module.css'
import {UserOutlined} from "@ant-design/icons";
import {Avatar} from "antd";

type PropsType = {
  dataUser: UserType
}

export const User: React.FC<PropsType> = (
  {dataUser: {
    name,
    id,
    status,
    uniqueUrlName,
    photos,
    followed}
  }
  ) => {

  const avatarImg = () => {
    if(photos.small){
      return <img src={photos.small} alt={'avatar'} height={'64px'} />
    }if(photos.large){
      return <img src={photos.large} alt={'avatar'} />
    }else{
      return <Avatar shape="square" size={64} icon={<UserOutlined />} />
    }
  }

  return (
    <div className={styles.wrapper}>
      {avatarImg()}
      <div className={styles.col}>
        <span>{name}</span>
        <span>{status}</span>
      </div>

    </div>
  );
};