export interface CancelSearchRequestAction {
  type: 'CANCEL_SEARCH'
}

export function cancelSearchRequest(): CancelSearchRequestAction {
  return {
    type: 'CANCEL_SEARCH',
  }
}
