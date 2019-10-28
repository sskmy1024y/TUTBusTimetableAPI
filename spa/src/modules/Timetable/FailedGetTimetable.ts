export interface FailedGetTimetableAction {
  type: 'FAILED_GET_TIMETABLE'
}

export function failedGetTimetable(): FailedGetTimetableAction {
  return {
    type: 'FAILED_GET_TIMETABLE',
  }
}
