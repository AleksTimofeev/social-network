
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type AppReducerType = {
  statusInitializingApp: RequestStatusType
}
type ActionsType = ReturnType<typeof changeStatusInitializingApp>

const initialState: AppReducerType = {
  statusInitializingApp: 'loading'
}
enum Actions {
  STATUS_INITIALIZING_APP = 'STATUS_INITIALIZING_APP'
}

export const appReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case Actions.STATUS_INITIALIZING_APP: return{...state, statusInitializingApp: action.status}

    default: return state
  }
}

export const changeStatusInitializingApp = (status: RequestStatusType) => ({type: Actions.STATUS_INITIALIZING_APP, status} as const)