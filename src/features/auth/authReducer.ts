import {api, AuthMeDataType} from "../../api/api";
import {changeStatusInitializingApp} from "../../app/appReducer";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getProfileData} from "../profile/profileReducer";

export type AuthReducerStateType = {
  authMeData: AuthMeDataType
  errorResponse: any
}

const initialState: AuthReducerStateType = {
  authMeData: {
    id: null,
    login: null,
    email: null
  },

  errorResponse: null
}

export const authMe = createAsyncThunk('auth/authMe',async (arg, thunkAPI) => {
  thunkAPI.dispatch(changeStatusInitializingApp('loading'))
  try {
    const authData = await api.authMe()
    if (authData.resultCode === 0) {
      if(authData.data.id)thunkAPI.dispatch(getProfileData({id: authData.data.id}))
      thunkAPI.dispatch(changeStatusInitializingApp('succeeded'))
      return authData.data
    } else {
      thunkAPI.rejectWithValue({message: authData.messages})
    }
  } catch (error) {
    thunkAPI.rejectWithValue({message: 'error'})
    alert(error)
  } finally {
    // thunkAPI.dispatch(changeStatusInitializingApp('succeeded'))
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    const res = await api.logout()
    if (res.resultCode === 0) {
      return
    }
  } catch (error) {
    alert(error)
  }
})

export const login = createAsyncThunk('auth/login', async (
  arg: {email: string, password: string, rememberMe: boolean},
  thunkAPI) => {
  try {
    const res = await api.login(arg.email, arg.password, arg.rememberMe)
    if (res.resultCode === 0) {
      thunkAPI.dispatch(authMe())
    }
  } catch (e) {
    alert(e)
  } finally {

  }
})


const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authMe.fulfilled, (state, action) => {
      if(action.payload){
        state.authMeData = action.payload
      }
    })
    builder.addCase(authMe.rejected, (state, action) => {
      state.errorResponse = action.payload
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.authMeData.id = null
      state.authMeData.login = null
      state.authMeData.email = null
    })
  }
})

export const authReducer = slice.reducer

