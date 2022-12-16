import React, {useEffect} from 'react';
import {useAppDispatch} from "../../../app/store";
import {getCurrentUserProfileData} from "../usersReducer";
import {useParams} from "react-router-dom";

export const CurrentUser = () => {

  const params = useParams<{id: string}>()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCurrentUserProfileData({id: Number(params.id)}))
  },[])

  return (
    <div>
      currentUser
    </div>
  );
};