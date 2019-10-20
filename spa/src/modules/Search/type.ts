export enum SearchType {
  First,
  Depature,
  Arrival,
  Last,
}

export interface SearchRequestType {
  type: SearchType
  datetime?: Date
}
