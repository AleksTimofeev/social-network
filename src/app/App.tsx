import React, {useEffect} from 'react';
import Header from "../components/header/Header";
import styles from './App.module.css'
import {useAppDispatch, useAppSelector} from "./store";
import {authMe} from "../features/auth/authReducer";
import {Pages} from "../pages/Pages";
import Navigation from "../components/navigation/Navigation";

export const App = () => {

  const dispatch = useAppDispatch()
  const statusInitializingApp = useAppSelector(state => state.app.statusInitializingApp)

  useEffect(() => {
    dispatch(authMe())
  }, [])


  return (
    <div className={styles.container}>
      <Header />
      {statusInitializingApp === 'loading' ?
        <div className={styles.loadingWrapper}>
          <h2>LOADING</h2>
        </div> : <>
          <Navigation />
          <Pages/>
        </>
      }
    </div>
  );
}
