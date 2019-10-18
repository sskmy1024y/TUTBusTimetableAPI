export enum TargetTimeType {
  First,
  Depature,
  Arrival,
  Last,
}

export interface SearchRequestType {
  type: TargetTimeType
  datetime?: Date
}
