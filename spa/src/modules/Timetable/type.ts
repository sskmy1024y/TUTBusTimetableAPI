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

export type ReadTimetableCollectType = TimetableCollectType & {
  uuid: string
}

export enum TimetableDataType {
  Time, // 時刻
  NoBus, // バス運行日ではない時
  BusFinished, // 今日のバスが終了した時
  BusNotFound, // 検索結果がない場合
  NowLoading, // API取得中
  LoadingFailed // API取得失敗
}

export type TimetablesType = TimetableCollectType[]
