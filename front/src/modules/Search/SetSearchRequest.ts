import { SearchRequestType } from '.'

interface Payload {
  enable: boolean
  searchRequest: SearchRequestType | null
}

export interface SetSearchRequestAction {
  type: 'SET_SEARCH_REQUEST'
  payload: Payload
}

export function setSearchRequest(payload: Payload): SetSearchRequestAction {
  return {
    payload,
    type: 'SET_SEARCH_REQUEST',
  }
}
