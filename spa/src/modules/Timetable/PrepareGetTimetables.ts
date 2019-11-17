export interface PrepareGetTimetableAction {
  type: 'PREPARE_GET_TIMETABLE'
}

export function prepareGetTimetable(): PrepareGetTimetableAction {
  return {
    type: 'PREPARE_GET_TIMETABLE'
  }
}
