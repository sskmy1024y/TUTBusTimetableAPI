import { PlaceType } from '../../lib/types'

export interface TimetableType {
  id: number
  arrivalTime: Date
  departureTime: Date
  isShuttle: boolean
}

export interface TimetableCollectType {
  timetables: TimetableType[]
  departure: PlaceType
  arrival: PlaceType
}

export type TimetablesType = TimetableCollectType[]
