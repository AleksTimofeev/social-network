import React, {useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import styles from './Profile.module.css'
import avatar from '../../assets/image/artworks-SFJCSqkDi8QduppR-9TFs6Q-t500x500.jpg'
import {useAppSelector} from "../../app/store";

export const Profile = () => {

  const status = useAppSelector(state => state.profile.status)
  const photo = useAppSelector(state => state.profile.profileData.photos.large)
  const contacts = useAppSelector(state => state.profile.profileData.contacts)

  return (
    <Grid container spacing={2}>
      <div className={styles.container}>
        <div className={styles.photo}>
          <img src={photo ? photo : avatar} alt={'avatar'} />
        </div>
        <div className={styles.items}>
          {Object.entries(contacts).map(item => (
            <span>{item[0]} - {item[1] ? item[1] : 'not information'}</span>
          ))}
        </div>
        <h2>{status}</h2>
      </div>
    </Grid>
  );
}