import { Action } from 'modules/FavoriteCourse'
import { Dispatch } from 'react'
import { ThunkActionType } from './thunkAction'
import { actionCreator } from 'modules'

export enum StorageKey {
  FavCourse = 'favoriteCourses'
}

export function onload(): ThunkActionType {
  return (dispatch: Dispatch<Action>) => {
    const favoriteCourses = localStorage.getItem(StorageKey.FavCourse)

    if (favoriteCourses) {
      dispatch(actionCreator.restoreCourse({ courses: parseJSON(favoriteCourses) }))
    }
  }
}

export function parseJSON<T>(json: string): T[] {
  const array = JSON.parse(json)
  if (array instanceof Array) {
    return array.map<T>(obj => {
      return {
        ...obj
      }
    })
  } else {
    throw new Error()
  }
}
