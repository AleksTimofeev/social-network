import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {getUsers} from "./usersReducer";
import styles from './Users.module.css'
import {Pagination} from "antd";
import User from "./user/User";

export const Users = () => {

  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const [countUsers, setCountUsers] = useState(10)
  const dataUsers = useAppSelector(state => state.users)
  const followStatus = useAppSelector(state => state.users.followStatus)
  const statusGetUsers = useAppSelector(state => state.users.statusGetUsers)
  const pageCount = Math.ceil(dataUsers.totalCount / countUsers)

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
      className={styles.pagination}
      current={page}
      total={dataUsers.totalCount}
      onChange={handleChangeCurrentPage}
      onShowSizeChange={handleChangeSizePage}
    />
      {statusGetUsers === 'loading' ? <h2>LOADING</h2> : dataUsers.items.map(user => (
        <User
          key={user.id}
          dataUser={user}
          followStatus={followStatus.find(id => id === user.id)}
        />
      ))}
    </div>
  );
};

