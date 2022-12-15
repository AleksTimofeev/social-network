import {appReducer, changeStatusInitializingApp, RequestStatusType} from "./appReducer";

let initialState = {
  statusInitializingApp: 'loading' as RequestStatusType
}

beforeEach(() => {
  initialState = {
    statusInitializingApp: 'loading' as RequestStatusType
  }
})

test('change status app initializing', () => {
  const newState = appReducer(initialState, changeStatusInitializingApp('loading'))
  expect(newState.statusInitializingApp).toBe('loading')

  const newState1 = appReducer(initialState, changeStatusInitializingApp('idle'))
  expect(newState1.statusInitializingApp).toBe('idle')
})