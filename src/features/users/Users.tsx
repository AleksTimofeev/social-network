import React, {useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {getUsers} from "./usersReducer";

export const Users = () => {

  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const [countUsers, setCountUsers] = useState(10)
  const dataUsers = useAppSelector(state => state.users)
  const pageCount = Math.ceil(dataUsers.totalCount / countUsers)
  console.log('page count - ' + pageCount)

  useEffect(() => {
    dispatch(getUsers({page, countUsers}))
  },[page, countUsers])

  return (
    <Grid container spacing={2}>

    </Grid>
  );
};

