import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api, ProfileDataType} from "../../api/api";

const initialState: {profileData: ProfileDataType } & {status: string | null} = {
profileData: {
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
  status: null
}

export const getProfileData = createAsyncThunk(
  'profile/getProfileData',
  async (arg: { id: number }, thunkAPI) => {
    try {
      const profileData = await api.getProfileData(arg.id)
      const userStatus = await api.getUserStatus(arg.id)
      return {profileData, userStatus}
    }
    catch (e) {
      alert(e)
    }
    finally {

    }
  })

const slice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfileData.fulfilled, (state, action) => {
      if(action.payload){
        state.profileData = action.payload.profileData
        state.status = action.payload.userStatus
      }
    })
  }
})

export const profileReducer = slice.reducer