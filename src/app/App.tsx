import React, {useEffect} from 'react';
import Header from "../components/header/Header";
import styles from './App.module.css'
import {useAppDispatch, useAppSelector} from "./store";
import {authMe} from "../features/auth/authReducer";
import {Pages} from "../pages/Pages";

export const App = () => {

  const dispatch = useAppDispatch()
  const statusInitializingApp = useAppSelector(state => state.app.statusInitializingApp)

  useEffect(() => {
    dispatch(authMe())
  }, [])


  return (
    <div className="App">

      {statusInitializingApp === 'loading' ?
        <div className={styles.loadingWrapper}>
          <h2>LOADING</h2>
        </div> :
        <div>
          <div>
            <Header/>
          </div>
          <div>
            <div>
              <Pages/>
            </div>
          </div>
        </div>}


    </div>
  );
}
