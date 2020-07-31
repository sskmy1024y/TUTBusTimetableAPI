import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { RootState } from 'modules'

import { getLastUpdate, getTimetable } from './FetchTimetable'
import { onload } from './localStorage'
import { saveFavoriteCourse } from './SaveFavoriteCourse'

export type ThunkActionType = ThunkAction<void, RootState, undefined, Action>

export const thunkActionCreators = {
  onload,
  getTimetable,
  getLastUpdate,
  saveFavoriteCourse
}
