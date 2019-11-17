import { TimetablesType } from './type'

interface Payload {
  response: TimetablesType
}

export interface GetTimetableAction {
  type: 'GET_TIMETABLE'
  payload: Payload
}

export function getTimetable(payload: Payload): GetTimetableAction {
  return {
    payload,
    type: 'GET_TIMETABLE'
  }
}
