import { FailedGetTimetableAction, failedGetTimetable } from './FailedGetTimetable'
import { GetTimetableAction, getTimetable } from './GetTimetable'
import { PrepareGetTimetableAction, prepareGetTimetable } from './PrepareGetTimetables'
import { TimetablesType } from './type'

export * from './type'

export type Action = GetTimetableAction | FailedGetTimetableAction | PrepareGetTimetableAction

export type State = {
  data: TimetablesType
  success: boolean | null
}

export const initialState = {
  data: [],
  success: null
}

export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'PREPARE_GET_TIMETABLE':
      return {
        success: null,
        data: []
      }
    case 'GET_TIMETABLE':
      return {
        success: true,
        data: action.payload.response
      }
    case 'FAILED_GET_TIMETABLE':
      return {
        success: false,
        data: []
      }
    default:
      return state
  }
}

export const actionCreators = {
  getTimetable,
  failedGetTimetable,
  prepareGetTimetable
}
