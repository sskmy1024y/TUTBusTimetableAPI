import { FavCourseType } from './types'

interface Payload {
  course: FavCourseType
}

export interface RemoveCourseAction {
  type: 'REMOVE_COURSE'
  payload: Payload
}

export function removeCourse(payload: Payload): RemoveCourseAction {
  return {
    payload,
    type: 'REMOVE_COURSE'
  }
}
