import { AddCourseAction, addCourse } from './AddCourse'
import { FavCourseType } from './types'
import { RemoveCourseAction, removeCourse } from './RemoveCourse'
import { RestoreCourseAction, restoreCourse } from './RestoreCourse'

export * from './types'

export type Action = AddCourseAction | RemoveCourseAction | RestoreCourseAction

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
        courses: state.courses.filter(course => {
          return !(
            course.arrivalId === action.payload.course.arrivalId &&
            course.departureId === action.payload.course.departureId
          )
        })
      }
    case 'RESTORE_COURSE':
      return {
        courses: action.payload.courses
      }
    default:
      return state
  }
}

export const actionCreators = {
  addCourse,
  removeCourse,
  restoreCourse
}
