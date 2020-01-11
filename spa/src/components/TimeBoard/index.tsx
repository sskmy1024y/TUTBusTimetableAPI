import React from 'react'

import { FavCourseType } from 'modules/FavoriteCourse'
import { RootState } from 'modules'
import { TimetableCollectType, TimetableDataType } from '../../modules/Timetable/type'
import { useMemo, useSelector } from 'hooks'
import TimeBoardItem, { AnnounceItem } from './TimeBoardItem'

interface TimeBoardProps {
  timetables: TimetableCollectType[]
}

export default function TimeBoard({ timetables }: TimeBoardProps) {
  const isSuccess = useSelector<RootState, boolean | null>(state => state.timetables.success)
  const favoriteCourses = useSelector<RootState, FavCourseType[]>(state => state.favorite.courses)

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

  return isSuccess === true && sortTimetable.length > 0 ? (
    <>
      {sortTimetable.map((timetable, index) => {
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
