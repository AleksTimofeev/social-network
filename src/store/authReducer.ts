import {Dispatch} from "redux";
import {api, AuthMeDataType} from "../api/api";
import {changeStatusInitializingApp} from "./appReducer";

enum ActionsAuth {
  AUTH_ME = 'AUTH_ME',
  LOGOUT = 'LOGOUT',
  LOGIN = 'LOGIN'
}

export type AuthReducerStateType = AuthMeDataType & { isLogged: boolean }

type ActionsType = ReturnType<typeof authMeAC> |
  ReturnType<typeof logoutAC>|
  ReturnType<typeof loginAC>

const initialState: AuthReducerStateType = {
  id: null,
  login: null,
  email: null,
  isLogged: false
}

export const authReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case ActionsAuth.AUTH_ME:
      return {...state, ...action.data, isLogged: true}
    case ActionsAuth.LOGOUT: return {...state,
      id: null,
      login: null,
      email: null,
      isLogged: false
    }
    case ActionsAuth.LOGIN: return {...state, id: action.idUser, isLogged: true}

    default:
      return state
  }
}

const authMeAC = (data: AuthMeDataType) => ({type: ActionsAuth.AUTH_ME, data}as const)
const logoutAC = () => ({type: ActionsAuth.LOGOUT}as const)
const loginAC = (idUser: number) => ({type: ActionsAuth.LOGIN, idUser}as const)

export const authMeTC = () => async (dispatch: Dispatch) => {
  try {
    dispatch(changeStatusInitializingApp('loading'))
    const authData = await api.authMe()
    if (authData.resultCode === 0) {
      dispatch(authMeAC(authData.data))
      // dispatch(changeStatusInitializingApp('succeeded'))
    }
  } catch (error) {
    alert(error)
  } finally {
    dispatch(changeStatusInitializingApp('succeeded'))
  }
}
export const logoutTC = () => async (dispatch: Dispatch) => {
  debugger
  try {
    const res = await api.logout()
    if(res.resultCode === 0){
      dispatch(logoutAC())
    }
  }catch (error){
    alert(error)
  }
}
export const loginTC = (email: string, password: string, rememberMe: boolean) => async (dispatch: Dispatch) => {
  try {
    const res = await api.login(email, password, rememberMe)
    if(res.resultCode === 0){
      dispatch(loginAC(res.data.id))
    }
  }catch (e) {
    alert(e)
  }finally {

  }
}