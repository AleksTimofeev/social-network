import {Dispatch} from "redux";
import {api, AuthMeDataType} from "../api/api";
import {changeStatusInitializingApp} from "./appReducer";

enum Actions {
  AUTH_ME = 'AUTH_ME'
}

export type AuthReducerStateType = AuthMeDataType & { isLogged: boolean }

type ActionsType = ReturnType<typeof authMeAC>

const initialState: AuthReducerStateType = {
  id: null,
  login: null,
  email: null,
  isLogged: false
}

export const authReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case Actions.AUTH_ME:
      return {...state, ...action.data, isLogged: true}

    default:
      return state
  }
}

const authMeAC = (data: AuthMeDataType) => ({type: Actions.AUTH_ME, data} as const)

export const authMeTC = () => async (dispatch: Dispatch) => {
  try {
    dispatch(changeStatusInitializingApp('loading'))
    const authData = await api.authMe()
    if (authData.resultCode === 0) {
      dispatch(authMeAC(authData.data))
      dispatch(changeStatusInitializingApp('succeeded'))
    }
  } catch (error) {
    alert(error)
  }
}