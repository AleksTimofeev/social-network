import React from 'react';
import {Route, Routes} from "react-router-dom";
import Profile from "../features/profile/Profile";
import Login from "../features/auth/login/Login";

export const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={
          <h2>Home</h2>
        }/>
        <Route path={'profile'} element={<Profile/>}/>
        <Route path={'login'} element={<Login />} />
      </Routes>
    </div>
  );
};

