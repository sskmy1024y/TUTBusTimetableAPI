import { combineReducers } from 'redux'
import * as Timetable from './Timetable'
import * as Search from './Search'

export interface RootState {
  timetables: Timetable.State
  search: Search.State
}

export const rootReducer = combineReducers({
  timetables: Timetable.reducer,
  search: Search.reducer,
})

export const actionCreator = {
  ...Timetable.actionCreators,
  ...Search.actionCreators,
}
