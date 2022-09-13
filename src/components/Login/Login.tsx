import React, {useEffect} from 'react';
import {useFormik} from "formik";
import {AppStateType, useAppDispatch} from "../../store";
import {loginTC} from "../../store/authReducer";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Login = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLogged = useSelector((state: AppStateType) => state.auth.isLogged)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      dispatch(loginTC(values.email, values.password, false))
    },
  });

  useEffect(() => {
    if(isLogged) {
      navigate('/')
    }
  },[isLogged])

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

export default Login;