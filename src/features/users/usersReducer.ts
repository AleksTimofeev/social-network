import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {api, ProfileDataType, UsersType} from "../../api/api";
import {RequestStatusType} from "../../app/appReducer";

const initialState: UsersType &
  {followStatus: Array<number>} &
  {currentUserProfile: ProfileDataType, currentUserStatus: string | null} &
  {statusGetUsers: RequestStatusType, statusGetCurrentUserProfileData: RequestStatusType} = {
  items: [],
  totalCount: 0,
  error: null,
  followStatus: [],
  currentUserStatus: null,
  currentUserProfile: {
    aboutMe: null,
    contacts: {
      facebook: null,
      website: null,
      vk: null,
      twitter: null,
      instagram: null,
      youtube: null,
      github: null,
      mainLink: null
    },
    lookingForAJob: false,
    lookingForAJobDescription: null,
    fullName: null,
    userId: null,
    photos: {
      small: null,
      large: null
    }
  },
  statusGetUsers: 'idle',
  statusGetCurrentUserProfileData: 'idle'

}

export const getUsers = createAsyncThunk('users/getUsers',
  async (arg: {countUsers: number, page: number}, thunkAPI) => {
  thunkAPI.dispatch(changeStatusGetUsers('loading'))
  try {
    const users = await api.getUsers(arg.countUsers, arg.page)
    return users
  }catch (error){
    return thunkAPI.rejectWithValue(error)
  }finally {
    thunkAPI.dispatch(changeStatusGetUsers('idle'))

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

export const getCurrentUserProfileData = createAsyncThunk(
  'users/getCurrentProfileData',
  async (arg: { id: number }, thunkAPI) => {
    thunkAPI.dispatch(changeStatusGetCurrentUser('loading'))
    try {
      const profileData = await api.getProfileData(arg.id)
      const userStatus = await api.getUserStatus(arg.id)
      return {profileData, userStatus}
    }
    catch (e) {
      alert(e)
    }
    finally {
      thunkAPI.dispatch(changeStatusGetCurrentUser('idle'))
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
    },
    changeStatusGetCurrentUser: (state, action: PayloadAction<RequestStatusType>) => {
      state.statusGetCurrentUserProfileData = action.payload
    },
    changeStatusGetUsers: (state, action: PayloadAction<RequestStatusType>) => {
      state.statusGetUsers = action.payload
    },
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
    builder.addCase(getCurrentUserProfileData.fulfilled, (state, action) => {
      if(action.payload){
        state.currentUserProfile = action.payload.profileData
        state.currentUserStatus = action.payload.userStatus
        state.statusGetCurrentUserProfileData = 'idle'
      }
    })
  }
})

export const {changeFollowStatus, changeStatusGetCurrentUser, changeStatusGetUsers} = slice.actions
export const usersReducer = slice.reducer