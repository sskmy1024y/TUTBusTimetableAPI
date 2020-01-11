import { FavCourseType } from './types'

interface Payload {
  course: FavCourseType
}

export interface AddCourseAction {
  type: 'ADD_COURSE'
  payload: Payload
}

export function addCourse(payload: Payload): AddCourseAction {
  return {
    payload,
    type: 'ADD_COURSE'
  }
}
