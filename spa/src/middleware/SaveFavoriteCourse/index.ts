import { Action } from 'modules/FavoriteCourse'
import { Dispatch } from 'react'
import { PlaceType } from 'lib/types'
import { RootState, actionCreator } from 'modules'
import { StorageKey } from 'middleware/localStorage'
import { ThunkActionType } from 'middleware/thunkAction'

interface Payload {
  type: 'ADD' | 'REMOVE'
  arrival: PlaceType
  departure: PlaceType
}

export const saveFavoriteCourse = ({ type, arrival, departure }: Payload): ThunkActionType => (
  dispatch: Dispatch<Action>,
  getState: () => Pick<RootState, 'favorite'>
) => {
  const courseAction = type === 'ADD' ? actionCreator.addCourse : actionCreator.removeCourse

  dispatch(
    courseAction({
      course: {
        departureId: departure.id,
        arrivalId: arrival.id
      }
    })
  )

  localStorage.setItem(StorageKey.FavCourse, JSON.stringify(getState().favorite.courses))
}
