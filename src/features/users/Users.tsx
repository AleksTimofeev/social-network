import React, {useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import {useAppDispatch} from "../../app/store";
import {getUsers} from "./usersReducer";

export const Users = () => {

  const dispatch = useAppDispatch()
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    dispatch(getUsers({page: pageNumber}))
  },[pageNumber])

  return (
    <Grid container spacing={2}>

    </Grid>
  );
};

