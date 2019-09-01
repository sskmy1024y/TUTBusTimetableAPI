import { Dispatch } from 'react'
import { Action } from 'redux'
import { ThunkActionType } from '../thunkAction'

interface FetchTimetablePayload {
  date: Date
}

export const thunkAction = (_payload: FetchTimetablePayload): ThunkActionType => async (
  _dispatch: Dispatch<Action>
) => {
  await fetch(
    `https://bus.t-lab.cs.teu.ac.jp/api/v1/timetables/internal?datatime=${'2019-10-24 10:00'}`,
    {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
  ).then(function(response) {
    console.log(response)
    return response.json()
  })
}
