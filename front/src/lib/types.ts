/**
 * リンクに関する型定義
 */
export interface LinkType {
  name: string
  path: string
  component?(): JSX.Element
}

export interface PlaceType {
  id: number
  name: string
}

export interface TimetableType {
  id: number
  arrivalTime: Date
  departureTime: Date
  isShuffle: boolean
}

export interface TimetableListType {
  list: TimetableType[]
}
