import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from 'src/modules'

export type ThunkActionType = ThunkAction<void, RootState, undefined, Action>
