import { AddCourseAction, addCourse } from './AddCourse'
import { RemoveCourseAction, removeCourse } from './RemoveCourse'
import { FavCourseType } from './types'

export * from './types'

export type Action = AddCourseAction | RemoveCourseAction

export type State = {
  courses: FavCourseType[]
}

export const initialState = {
  courses: []
}

export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'ADD_COURSE':
      return {
        courses: [...state.courses, action.payload.course]
      }
    case 'REMOVE_COURSE':
      return {
        courses: state.courses.filter(course => course !== action.payload.course)
      }
  }
}

export const actionCreators = {
  addCourse,
  removeCourse
}
