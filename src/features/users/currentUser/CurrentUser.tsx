import React, {useEffect} from 'react';
import {useAppDispatch} from "../../../app/store";
import {getCurrentUserProfileData} from "../usersReducer";
import {useParams} from "react-router-dom";

export const CurrentUser = () => {

  const params = useParams()
  console.log(params)

  const dispatch = useAppDispatch()

  useEffect(() => {
    // dispatch(getCurrentUserProfileData())
  },[])

  return (
    <div>
      currentUser
    </div>
  );
};