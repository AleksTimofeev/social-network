import React from 'react';
import {useAppSelector} from "../app/store";
import {Navigate} from "react-router-dom";

type PropsType = {
  children: React.ReactNode
}

export const PrivateRoute: React.FC<PropsType> = ({children}) => {

  const isLogged = Boolean(useAppSelector(state => state.auth.authMeData.id))

  if(isLogged){
    return <>{children}</>
  }else{
    return <Navigate to={'/login'} />
  }
};