import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Profile} from "../features/profile/Profile";
import {Login} from "../features/auth/login/Login";
import {Users} from "../features/users/Users";
import {useAppSelector} from "../app/store";

export const Pages = () => {

  const isLogged = Boolean(useAppSelector(state => state.auth.authMeData.id))

  return (
    <div>
      <Routes>
        <Route path={'/'} element={
          <h2>Home</h2>
        }/>
        <Route path={'profile'} element={isLogged ? <Profile /> : <Login />}/>
        <Route path={'users'} element={isLogged ? <Users /> : <Login />}/>
        <Route path={'login'} element={<Login />} />
      </Routes>
    </div>
  );
};

