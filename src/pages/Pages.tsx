import React from 'react';
import {Route, Routes, useLocation, useParams} from "react-router-dom";
import {Profile} from "../features/profile/Profile";
import {PrivateRoute} from "./PrivateRoute";
import {Login} from "../features/auth/login/Login";

export const Pages = () => {

  return (
    <div>
      <Routes>
        <Route path={'/'} element={
          <h2>Home</h2>
        }/>
          <Route path={'profile'} element={<PrivateRoute><Profile/></PrivateRoute>}/>
          <Route path={'login'} element={<Login />} />
      </Routes>
    </div>
  );
};

