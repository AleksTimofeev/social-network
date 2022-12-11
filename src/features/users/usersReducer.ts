import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {api, UsersType} from "../../api/api";
import {RequestStatusType} from "../../app/appReducer";

const initialState: UsersType & {followStatus: Array<number>} = {
  items: [],
  totalCount: 0,
  error: null,
  followStatus: []
}

export const getUsers = createAsyncThunk('users/getUssers',
  async (arg: {countUsers: number, page: number}, thunkAPI) => {
  try {
    const users = await api.getUsers(arg.countUsers, arg.page)
    return users
  }catch (error){
    return thunkAPI.rejectWithValue(error)
  }
})

export const isFollower = createAsyncThunk(
  'users/isFollower', async(arg: {userId: number}, {dispatch}) => {

})
export const follow = createAsyncThunk
('users/follow', async(arg: {userId: number}, {dispatch, rejectWithValue}) => {
  dispatch(changeFollowStatus(arg.userId))
  try {
    const followRes = await api.follow(arg.userId)
    if(followRes.resultCode === 0){
      return arg.userId
    }
  }catch (e) {
    return {message: e}
  }finally {
    dispatch(changeFollowStatus(arg.userId))
  }
})
export const unfollow = createAsyncThunk('users/unfollow', async(arg: {userId: number}, {dispatch}) => {
  dispatch(changeFollowStatus(arg.userId))
  try {
    const followRes = await api.unfollow(arg.userId)
    if(followRes.resultCode === 0){
      return arg.userId
    }
  }catch (e) {
    return {message: e}
  }finally {
    dispatch(changeFollowStatus(arg.userId))
  }
})

const slice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    changeFollowStatus: (state, action: PayloadAction<number>) => {
      const findId = state.followStatus.find(id => id === action.payload)
      if(findId){
        state.followStatus = state.followStatus.filter(id => id !== action.payload)
      }else{
       state.followStatus.push(action.payload)
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.items = action.payload.items
      state.totalCount = action.payload.totalCount
    })
    builder.addCase(follow.fulfilled, (state, action) => {
      state.items.find(user => user.id === action.payload ? user.followed = true : undefined)
    })
    builder.addCase(unfollow.fulfilled, (state, action) => {
      state.items.find(user => user.id === action.payload ? user.followed = false : undefined)
    })
  }
})

export const {changeFollowStatus} = slice.actions
export const usersReducer = slice.reducer