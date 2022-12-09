import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api, UsersType} from "../../api/api";

const initialState: UsersType = {
  items: [],
  totalCount: 0,
  error: null
}

export const getUsers = createAsyncThunk('users/getUssers',
  async (arg: {countUsers: number, page: number}, thunkAPI) => {
  try {
    const data = await api.getUsers(arg.countUsers, arg.page)
    return data
  }catch (error){
    return thunkAPI.rejectWithValue(error)
  }
})

const slice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.items = action.payload.items
      state.totalCount = action.payload.totalCount
    })
  }
})

export const {} = slice.actions
export const usersReducer = slice.reducer