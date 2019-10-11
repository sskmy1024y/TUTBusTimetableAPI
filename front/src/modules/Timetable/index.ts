import { getTimetable, GetTimetableAction } from './GetTimetable'
import { TimetableCollectType } from './type'

export * from './type'

export type Action = GetTimetableAction

export type State = TimetableCollectType[]

export function reducer(state: State = [], action: Action) {
  switch (action.type) {
    case 'GET_TIMETABLE':
      return action.payload.response
    default:
      return state
  }
}

export const actionCreators = {
  getTimetable,
}
