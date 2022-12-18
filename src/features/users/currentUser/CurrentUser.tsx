import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {getCurrentUserProfileData} from "../usersReducer";
import {useParams} from "react-router-dom";

export const CurrentUser = () => {

  const params = useParams<{id: string}>()
  const dispatch = useAppDispatch()
  const userData = useAppSelector(state => state.users.currentUserProfile)
  const userStatus = useAppSelector(state => state.users.currentUserStatus)
  const statusGetCurrentUser = useAppSelector(state => state.users.statusGetCurrentUserProfileData)

  useEffect(() => {
    dispatch(getCurrentUserProfileData({id: Number(params.id)}))
  },[])

  return (
    <div>
      {statusGetCurrentUser === 'loading' ?
        <h2>LOADING</h2> :
        <>currentUser - {userData.fullName}</>
      }
    </div>
  );
};