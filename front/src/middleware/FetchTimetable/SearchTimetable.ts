import { Action } from 'redux'
import { Dispatch } from 'react'

import { SearchType } from 'modules/Search'
import { ThunkActionType } from 'middleware/thunkAction'
import { TimetableCollectType, TimetableType } from 'modules/Timetable'
import { actionCreator } from 'modules'
import { fetchTimetable } from 'lib/api/client'

interface FetchTimetablePayload {
  datetime: Date
  searchType: SearchType
}

export const searchTimetable = ({ datetime }: FetchTimetablePayload): ThunkActionType => async (
  dispatch: Dispatch<Action>
) => {
  const resultDatas = await fetchTimetable(datetime)
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
