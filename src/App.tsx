import React from 'react';
import {BrowserRouter, Link, NavLink, Route, Routes} from "react-router-dom";
import {Container, Grid} from "@mui/material";
import Header from "./components/Header/Header";
import Profile from "./components/Main/Pages/Profile/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>

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
                <Route path={'profile'} element={<Profile />} />
              </Routes>
            </Container>
          </Grid>
        </Grid>

      </BrowserRouter>
    </div>
  );
}

export default App;
