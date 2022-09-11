import {combineReducers} from "redux";

export const rootReducer = combineReducers({
  testReducer: () => {
    return {value: 'ddd'}
  }
})