import { FailedGetTimetableAction, failedGetTimetable } from './FailedGetTimetable'
import { GetTimetableAction, getTimetable } from './GetTimetable'
import { PrepareGetTimetableAction, prepareGetTimetable } from './PrepareGetTimetables'
import { SetLastUpdateAction, setLastUpdate } from './SetLastUpdate'
import { TimetablesType } from './type'
import { isValidDatetimeString } from 'lib/utils'

export * from './type'

export type Action =
  | GetTimetableAction
  | FailedGetTimetableAction
  | PrepareGetTimetableAction
  | SetLastUpdateAction

export type State = {
  data: TimetablesType
  success: boolean | null
  lastUpdate: Date | null
}

export const initialState = {
  data: [],
  success: null,
  lastUpdate: null
}

export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'PREPARE_GET_TIMETABLE':
      return {
        ...state,
        success: null
      }
    case 'GET_TIMETABLE':
      return {
        ...state,
        success: true,
        data: action.payload.response
      }
    case 'FAILED_GET_TIMETABLE':
      return {
        ...state,
        success: false
      }
    case 'SET_LAST_UPDATE': {
      return {
        ...state,
        lastUpdate: isValidDatetimeString(action.payload.response)
          ? new Date(action.payload.response)
          : null
      }
    }
    default:
      return state
  }
}

export const actionCreators = {
  getTimetable,
  failedGetTimetable,
  prepareGetTimetable,
  setLastUpdate
}
