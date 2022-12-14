import React from 'react';
import {UserType} from "../../../api/api";
import styles from './User.module.css'
import {UserOutlined} from "@ant-design/icons";
import {Avatar, Button} from "antd";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {follow, unfollow} from "../usersReducer";
import {useNavigate} from "react-router-dom";

type PropsType = {
  dataUser: UserType
  followStatus: number | undefined
}

const User: React.FC<PropsType> = (
  {dataUser: {
    name,
    id,
    status,
    uniqueUrlName,
    photos,
    followed}, followStatus
  }
  ) => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleFollow = () => {
    dispatch(follow({userId: id}))
  }
  const handleUnfollow = () => {
    dispatch(unfollow({userId: id}))
  }
  const handleGoToProfile = () => {
    navigate(`/users/${id}`)
  }
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
      <div className={styles.followButtons}>
        {followed ?
          <Button type={'default'} size={'small'} disabled={!!followStatus} onClick={handleUnfollow}>
            unfollow
          </Button> :
          <Button type={'default'} size={'small'} disabled={!!followStatus} onClick={handleFollow}>
            follow
          </Button>}
      </div>
      <Button onClick={handleGoToProfile} size={"small"}>go to profile</Button>
    </div>
  );
};

export default React.memo(User)