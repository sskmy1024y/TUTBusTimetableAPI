import { PlaceType } from 'lib/types'

export interface TimetableType {
  id: number
  arrivalTime: Date
  departureTime: Date
  isShuttle: boolean
  isLast: boolean
}

export interface TimetableCollectType {
  timetables: TimetableType[]
  departure: PlaceType
  arrival: PlaceType
}

export enum TimetableDataType {
  Time, // 時刻
  NoBus, // バス運行日ではない時
  BusFinished, // 今日のバスが終了した時
}

export type TimetablesType = TimetableCollectType[]
