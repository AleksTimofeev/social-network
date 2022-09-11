import React from 'react';
import {BrowserRouter, Link, NavLink, Route, Routes} from "react-router-dom";
import {Container, Grid} from "@mui/material";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Grid container spacing={2}>
          <Grid xs={12}>
            <Header/>
          </Grid>
          <Grid xs={12}>
            <Container>
              <Routes>
                <Route path={'/'} element={
                  <h2>Home</h2>
                }/>
                <Route path={'profile'} element={<h1>Profile</h1>} />
              </Routes>
            </Container>
          </Grid>
        </Grid>


        {/*<Route path="/" element={<App />}>*/}
        {/*  <Route index element={<Home />} />*/}
        {/*  <Route path="teams" element={<Teams />}>*/}
        {/*    <Route path=":teamId" element={<Team />} />*/}
        {/*    <Route path="new" element={<NewTeamForm />} />*/}
        {/*    <Route index element={<LeagueStandings />} />*/}
        {/*  </Route>*/}
        {/*</Route>*/}

      </BrowserRouter>
    </div>
  );
}

export default App;
