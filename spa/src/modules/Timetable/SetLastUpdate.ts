interface Payload {
  response: string
}

export interface SetLastUpdateAction {
  type: 'SET_LAST_UPDATE'
  payload: Payload
}

export function setLastUpdate(payload: Payload): SetLastUpdateAction {
  return {
    payload,
    type: 'SET_LAST_UPDATE'
  }
}
