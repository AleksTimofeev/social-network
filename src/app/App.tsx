import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {CircularProgress, Container, Grid} from "@mui/material";
import Header from "../components/header/Header";
import Profile from "../features/profile/Profile";
import styles from './App.module.css'
import Login from "../features/auth/login/Login";
import {useAppDispatch, useAppSelector} from "./store";
import {authMe} from "../features/auth/authReducer";
import {Pages} from "../pages/Pages";

function App() {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLogged = useAppSelector(state => state.auth.authMeData.id)
  const statusInitializingApp = useAppSelector(state => state.app.statusInitializingApp)

  useEffect(() => {
    dispatch(authMe())
    if(!isLogged){
      navigate('login')
    }
  },[isLogged])

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
            {/*<Routes>*/}
            {/*  <Route path={'/'} element={*/}
            {/*    <h2>Home</h2>*/}
            {/*  }/>*/}
            {/*  <Route path={'profile'} element={<Profile/>}/>*/}
            {/*  <Route path={'login'} element={<Login />} />*/}
            {/*</Routes>*/}
          </Container>
        </Grid>
      </Grid>}


    </div>
  );
}

export default App;
