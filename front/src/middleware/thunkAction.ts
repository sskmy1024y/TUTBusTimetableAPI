import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../modules'
import { fetchTimetable } from './FetchTimetable'

export type ThunkActionType = ThunkAction<void, RootState, undefined, Action>

export const thunkActionCreators = {
  fetchTimetable,
}
