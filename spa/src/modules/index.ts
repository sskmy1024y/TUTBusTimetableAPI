import { combineReducers } from 'redux'

import * as FavoriteCourse from './FavoriteCourse'
import * as Search from './Search'
import * as Timetable from './Timetable'

export interface RootState {
  timetables: Timetable.State
  search: Search.State
  favorite: FavoriteCourse.State
}

export const initialState = {
  timetables: Timetable.initialState,
  search: Search.initialState,
  favorite: FavoriteCourse.initialState
}

export const rootReducer = combineReducers({
  timetables: Timetable.reducer,
  search: Search.reducer,
  favorite: FavoriteCourse.reducer
})

export const actionCreator = {
  ...Timetable.actionCreators,
  ...Search.actionCreators,
  ...FavoriteCourse.actionCreators
}
