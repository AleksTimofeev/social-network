import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UsersType} from "../../api/api";

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



const slice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    changePageNumber: (state, action: PayloadAction<{ pageNumber: number }>) => {
      state.page = action.payload.pageNumber
    }
  },
  extraReducers: (builder) => {

  }
})

export const usersReducer = slice.reducer