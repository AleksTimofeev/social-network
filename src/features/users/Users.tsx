import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {getUsers} from "./usersReducer";
import styles from './Users.module.css'
import {Pagination} from "antd";
import {log} from "util";

export const Users = () => {

  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const [countUsers, setCountUsers] = useState(10)
  const dataUsers = useAppSelector(state => state.users)
  const pageCount = Math.ceil(dataUsers.totalCount / countUsers)
  console.log('page count - ' + pageCount)

  const handleChangeCurrentPage = (page: number, pageSize: number) => {
    setPage(page)
  }

  const handleChangeSizePage = (current: number, size: number) => {
    setCountUsers(size)
  }

  useEffect(() => {
    dispatch(getUsers({page, countUsers}))
  },[page, countUsers])

  return (
    <div className={styles.wrapper}>
      <Pagination
        current={page}
        total={dataUsers.totalCount}
        onChange={handleChangeCurrentPage}
        onShowSizeChange={handleChangeSizePage}
      />
    </div>
  );
};

