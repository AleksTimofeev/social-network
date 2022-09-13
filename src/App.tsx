import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {CircularProgress, Container, Grid} from "@mui/material";
import Header from "./components/Header/Header";
import Profile from "./components/Main/Pages/Profile/Profile";
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "./store";
import {authMeTC} from "./store/authReducer";
import {RequestStatusType} from "./store/appReducer";
import styles from './app.module.css'
import Login from "./components/Login/Login";
import navigation from "./components/Header/Navigation/Navigation";

function App() {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLogged = useSelector((state: AppStateType): boolean => state.auth.isLogged)
  const statusInitializingApp = useSelector((state: AppStateType):RequestStatusType => state.app.statusInitializingApp)

  useEffect(() => {
    dispatch(authMeTC())
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
            <Routes>
              <Route path={'/'} element={
                <h2>Home</h2>
              }/>
              <Route path={'profile'} element={<Profile/>}/>
              <Route path={'login'} element={<Login />} />
            </Routes>
          </Container>
        </Grid>
      </Grid>}


    </div>
  );
}

export default App;
