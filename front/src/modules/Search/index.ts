import { SetSearchRequestAction, setSearchRequest } from './SetSearchRequest'

export * from './type'

export type Action = SetSearchRequestAction

export type State = boolean

export function reducer(state: State = false, action: Action) {
  switch (action.type) {
    case 'SET_SEARCH_REQUEST':
      return action.payload.enable
    default:
      return state
  }
}

export const actionCreators = {
  setSearchRequest,
}
