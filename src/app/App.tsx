import React, {useEffect} from 'react';
import {CircularProgress, Container, Grid} from "@mui/material";
import Header from "../components/header/Header";
import styles from './App.module.css'
import {useAppDispatch, useAppSelector} from "./store";
import {authMe} from "../features/auth/authReducer";
import {Pages} from "../pages/Pages";

function App() {

  const dispatch = useAppDispatch()
  const statusInitializingApp = useAppSelector(state => state.app.statusInitializingApp)

  useEffect(() => {
    dispatch(authMe())
  },[])

  return (
    <div className="App">

      {statusInitializingApp === 'loading' ?
        <div className={styles.loadingWrapper}>
          <CircularProgress size={'20%'} />
        </div> :
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header/>
        </Grid>
        <Grid item xs={12}>
          <Container>
            <Pages />
          </Container>
        </Grid>
      </Grid>}


    </div>
  );
}

export default App;
