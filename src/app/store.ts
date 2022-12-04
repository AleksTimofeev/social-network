import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "../features/auth/authReducer";
import {appReducer} from "./appReducer";


export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
  }
})

export type AppStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch
export const useAppDispatch: () => AppDispatchType = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector