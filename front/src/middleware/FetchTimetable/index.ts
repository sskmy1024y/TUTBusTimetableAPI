import { Dispatch } from 'react'
import { Action } from 'redux'
import { actionCreator } from '../../modules'
import { TimetablesType } from '../../modules/Timetable/type'
import { parseResponse } from '../client'
import { ThunkActionType } from '../thunkAction'

interface FetchTimetablePayload {
  date: Date
}

export const fetchTimetable = ({ date }: FetchTimetablePayload): ThunkActionType => async (
  dispatch: Dispatch<Action>
) => {
  const response = await fetch(
    `${process.env.REACT_APP_DEV_API_HOST}/api/v1/timetables/internal?datetime=${date.toString()}`,
    {
      mode: 'cors',
    }
  )
  if (response.ok) {
    try {
      const resultDatas = parseResponse<TimetablesType>(await response.json())
      // console.log(resultDatas)
      dispatch(actionCreator.getTimetable({ response: resultDatas }))
    } catch (e) {
      // tslint:disable-next-line: no-console
      console.error('ダメでした', e)
    }
  }
}
