import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {api, UsersType, UserType} from "../../api/api";

type PaginationUsers = {
  page: number,
  countPages: number,
  count: number
}

const initialState: UsersType & PaginationUsers = {
  items: [],
  totalCount: 0,
  error: null,
  page: 1,
  countPages: 0,
  count: 0
}

export const getUsers = createAsyncThunk('users/getUssers',
  async (arg: {count?: number, page?: number}, thunkAPI) => {
  try {
    const data = await api.getUsers(arg.count, arg.page)
    return data
  }catch (error){
    return thunkAPI.rejectWithValue(error)
  }
})

const slice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    changePageNumber: (state, action: PayloadAction<{ pageNumber: number }>) => {
      state.page = action.payload.pageNumber
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.items = action.payload.items
    })
  }
})

export const usersReducer = slice.reducer