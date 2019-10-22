import React from 'react'

import { TimetableCollectType } from '../../modules/Timetable/type'
import TimeBoardItem, { NoBusItem } from './TimeBoardItem'

interface TimeBoardProps {
  timetables: TimetableCollectType[]
}

export default function TimeBoard({ timetables }: TimeBoardProps) {
  return (
    <>
      {timetables.length > 0 ? (
        timetables.map((timetable, index) => {
          return <TimeBoardItem key={index} timetable={timetable} />
        })
      ) : (
        <NoBusItem />
      )}
    </>
  )
}
