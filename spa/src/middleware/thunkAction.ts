import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { RootState } from 'modules'

import { onload } from './localStorage'
import { getTimetable } from './FetchTimetable'
import { saveFavoriteCourse } from './SaveFavoriteCourse'

export type ThunkActionType = ThunkAction<void, RootState, undefined, Action>

export const thunkActionCreators = {
  onload,
  getTimetable,
  saveFavoriteCourse
}
