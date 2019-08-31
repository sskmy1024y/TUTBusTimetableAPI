import { TimetableCollectType } from './type'

interface Payload {
  response: TimetableCollectType[]
}

export interface GetTimetableAction {
  type: 'GET_TIMETABLE'
  payload: Payload
}

export function getTimetable(payload: Payload): GetTimetableAction {
  return {
    type: 'GET_TIMETABLE',
    payload
  }
}
