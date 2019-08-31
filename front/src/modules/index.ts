import { combineReducers } from 'redux'
import * as Timetable from './Timetable'

export type RootState = {
  timetables: Timetable.State
}

export const rootReducer = combineReducers({
  timetables: Timetable.reducer
})

export const actionCreator = {
  ...Timetable.actionCreators
}
