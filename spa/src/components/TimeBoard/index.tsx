import React from 'react'

import { TimetableCollectType, TimetableDataType } from '../../modules/Timetable/type'
import TimeBoardItem, { AnnounceItem } from './TimeBoardItem'
import { useSelector } from 'hooks'
import { RootState } from 'modules'

interface TimeBoardProps {
  timetables: TimetableCollectType[]
}

export default function TimeBoard({ timetables }: TimeBoardProps) {
  const isSuccess = useSelector<RootState, boolean | null>(state => state.timetables.success)

  return isSuccess === true && timetables.length > 0 ? (
    <>
      {timetables.map((timetable, index) => {
        return <TimeBoardItem key={index} timetable={timetable} />
      })}
    </>
  ) : (
    <AnnounceItem
      type={
        isSuccess !== null
          ? isSuccess
            ? TimetableDataType.NoBus
            : TimetableDataType.LoadingFailed
          : TimetableDataType.NowLoading
      }
    />
  )
}
