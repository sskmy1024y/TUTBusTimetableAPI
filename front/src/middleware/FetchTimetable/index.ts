import { Dispatch } from 'react'
import { Action } from 'redux'
import { ThunkActionType } from '../thunkAction'

interface FetchTimetablePayload {
  date: Date
}

export const fetchTimetable = (payload: FetchTimetablePayload): ThunkActionType => async (
  dispatch: Dispatch<Action>
) => {
  await fetch(`${process.env.REACT_APP_API_HOST}/api/v1/timetables/internal?datetime=${'2019-10-24 10:00'}`, {
    mode: 'cors',
  })
    .then(response => {
      return response.json()
    })
    .catch(error => {
      console.error('ダメでした')
    })
}
