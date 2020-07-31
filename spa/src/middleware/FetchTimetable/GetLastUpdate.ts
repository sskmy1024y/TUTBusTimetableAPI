import { Action } from 'redux'
import { Dispatch } from 'react'

import { ThunkActionType } from 'middleware/thunkAction'
import { actionCreator } from 'modules'
import { fetchLastUpdate } from 'lib/api/client'

export const getLastUpdate = (): ThunkActionType => async (dispatch: Dispatch<Action>) => {
  try {
    const response = await fetchLastUpdate()
    dispatch(actionCreator.setLastUpdate({ response }))
  } catch (e) {
    dispatch(actionCreator.noOp())
  }
}
