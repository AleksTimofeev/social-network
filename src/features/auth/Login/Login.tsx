import React, {useEffect} from 'react';
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {login} from "../authReducer";

const Login = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLogged = useAppSelector(state => state.auth.userData.id)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      dispatch(login({email: values.email, password: values.password, rememberMe: false}))
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