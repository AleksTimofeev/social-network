import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const slice = createSlice({
  name: 'app',
  initialState: {
    statusInitializingApp: 'loading' as RequestStatusType
  },
  reducers: {
    changeStatusInitializingApp: (state, action: PayloadAction<RequestStatusType>) => {
      state.statusInitializingApp = action.payload
    }
  },
  extraReducers: (builder) => {

  }
})

export const appReducer = slice.reducer

export const { changeStatusInitializingApp } = slice.actions