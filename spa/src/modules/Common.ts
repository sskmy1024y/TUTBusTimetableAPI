export interface NoOpAction {
  type: 'NO_OP'
}

export function noOp(): NoOpAction {
  return {
    type: 'NO_OP'
  }
}

export const actionCreator = {
  noOp
}
