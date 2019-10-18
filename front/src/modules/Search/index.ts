import { CancelSearchRequestAction, cancelSearchRequest } from './CancelSearch'
import { SearchRequestType, SearchType } from './type'
import { SetSearchRequestAction, setSearchRequest } from './SetSearchRequest'

export * from './type'

export type Action = SetSearchRequestAction & CancelSearchRequestAction

export type State = {
  isSearch: boolean
  requestType: SearchRequestType
}

const initialState = {
  isSearch: false,
  requestType: {
    type: SearchType.Depature,
  },
}

export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'SET_SEARCH_REQUEST':
      return {
        isSearch: true,
        requestType: action.payload.request,
      }
    case 'CANCEL_SEARCH_REQUEST':
      return {
        ...state,
        isSearch: false,
      }
    default:
      return state
  }
}

export const actionCreators = {
  setSearchRequest,
  cancelSearchRequest,
}
