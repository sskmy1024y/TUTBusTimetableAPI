import { Dispatch } from 'react'
import { Action } from 'redux'
import { actionCreator } from '../../modules'
import { TimetableType, TimetableCollectType } from '../../modules/Timetable'
import { fetchTimetable } from '../../lib/api/client'
import { ThunkActionType } from '../thunkAction'

interface FetchTimetablePayload {
  date: Date
}

export const getTimetable = ({ date }: FetchTimetablePayload): ThunkActionType => async (
  dispatch: Dispatch<Action>
) => {
  const resultDatas = await fetchTimetable(date)
  const response = resultDatas.map<TimetableCollectType>(data => {
    return {
      timetables: data.timetables.map<TimetableType>(timetable => ({
        id: timetable.id,
        arrivalTime: new Date(timetable.arrival_time),
        departureTime: new Date(timetable.departure_time),
        isShuttle: timetable.is_shuttle,
      })),
      departure: data.departure,
      arrival: data.arrival,
    }
  })

  dispatch(actionCreator.getTimetable({ response }))
}
