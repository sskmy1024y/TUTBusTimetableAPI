import { PlaceType } from '../types'

interface TimetableApiData {
  id: number
  arrival_time: string
  departure_time: string
  is_shuttle: boolean
  is_last?: boolean
}

interface TimetableCollectApiData {
  timetables: TimetableApiData[]
  departure: PlaceType
  arrival: PlaceType
}

export type TimetablesApiData = TimetableCollectApiData[]
