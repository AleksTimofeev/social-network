import React from 'react';
import {useAppSelector} from "../app/store";
import {Navigate} from "react-router-dom";

type PropsType = {
  // children: React.ReactNode
  path: string
}

export const PrivateRoute: React.FC<PropsType> = ({path}) => {

  const isLogged = Boolean(useAppSelector(state => state.auth.authMeData.id))

  if(isLogged){
    return <Navigate to={path}/>
  }else{
    return <Navigate to={'/login'} />
  }
};