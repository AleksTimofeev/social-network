import React from 'react';
import {useFormik} from "formik";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {login} from "../authReducer";

export const Login = () => {

  const dispatch = useAppDispatch()
  const isLogged = Boolean(useAppSelector(state => state.auth.authMeData.id))

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      dispatch(login({email: values.email, password: values.password, rememberMe: false}))
    },
  });

  if(isLogged){
    return <Navigate to={'/profile'} />
  }

  return (
    <form onSubmit={formik.handleSubmit}>

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <label htmlFor="password">password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />

      <button type="submit">Submit</button>
    </form>
  );
};