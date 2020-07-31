import React from 'react'

import { ReadTimetableCollectType, TimetableDataType } from '../../modules/Timetable/type'
import { useFlipGroup, useMemo, useSelector } from 'hooks'
import TimeBoardItem, { AnnounceItem } from './TimeBoardItem'

interface TimeBoardProps {
  timetables: ReadTimetableCollectType[]
}

export default function TimeBoard({ timetables }: TimeBoardProps) {
  const isSuccess = useSelector(state => state.timetables.success)
  const favoriteCourses = useSelector(state => state.favorite.courses)

  const flipId = 'flipRoot'

  const sortTimetable = useMemo(
    () =>
      timetables
        .map(timetable => {
          const index = favoriteCourses.findIndex(
            course =>
              course.arrivalId === timetable.arrival.id &&
              course.departureId === timetable.departure.id
          )
          return { ...timetable, index }
        })
        .sort((prev, next) => {
          return prev.index <= next.index ? 1 : -1
        }),
    [timetables, favoriteCourses]
  )

  useFlipGroup({
    flipId,
    opts: { duration: 500, easing: 'cubic-bezier(0.68, -0.1, 0.265, 1.55)' },
    deps: sortTimetable
  })

  return isSuccess === true && sortTimetable.length > 0 ? (
    <div id={flipId}>
      {sortTimetable.map(timetable => {
        return <TimeBoardItem key={timetable.uuid} timetable={timetable} />
      })}
    </div>
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
