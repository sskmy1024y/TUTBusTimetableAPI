import { FavCourseType } from './types'

interface Payload {
  courses: FavCourseType[]
}

export interface RestoreCourseAction {
  type: 'RESTORE_COURSE'
  payload: Payload
}

export function restoreCourse(payload: Payload): RestoreCourseAction {
  return {
    payload,
    type: 'RESTORE_COURSE'
  }
}
