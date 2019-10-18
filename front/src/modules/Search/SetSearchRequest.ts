interface Payload {
  enable: boolean
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
