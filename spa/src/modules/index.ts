import { combineReducers } from 'redux'

import * as Search from './Search'
import * as Timetable from './Timetable'

export interface RootState {
  timetables: Timetable.State
  search: Search.State
}

export const initialState = {
  timetables: Timetable.initialState,
  search: Search.initialState,
}

export const rootReducer = combineReducers({
  timetables: Timetable.reducer,
  search: Search.reducer,
})

export const actionCreator = {
  ...Timetable.actionCreators,
  ...Search.actionCreators,
}
