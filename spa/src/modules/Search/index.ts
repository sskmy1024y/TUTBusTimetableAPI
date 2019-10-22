import { SearchRequestType } from './type'
import { SetSearchRequestAction, setSearchRequest } from './SetSearchRequest'

export * from './type'

export type Action = SetSearchRequestAction

export type State = {
  isSearch: boolean
  searchRequest: SearchRequestType | null
}

const initialState = {
  isSearch: false,
  searchRequest: null,
}

export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'SET_SEARCH_REQUEST':
      return {
        isSearch: action.payload.enable,
        searchRequest: action.payload.searchRequest,
      }
    default:
      return state
  }
}

export const actionCreators = {
  setSearchRequest,
}
