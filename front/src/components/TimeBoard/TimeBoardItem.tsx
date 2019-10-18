import React from 'react'

import { TimetableCollectType, TimetableDataType } from 'modules/Timetable/type'

import styled from 'styled-components'

import BulletinBody from './BulletinBody'
import BulletinHeader from './BulletinHeader'
import { useSelector } from 'hooks'
import { RootState } from 'modules'

interface TimeBoardProps {
  timetable: TimetableCollectType
}

export default function TimeBoardItem({ timetable }: TimeBoardProps) {
  const isSearch = useSelector<RootState, boolean>(state => state.search.isSearch)
  const labels = ['先発', '次発', '次々発', '四発', '五発']
  const lastLabel = '最終'

  return (
    <BulletinBoard>
      <BulletinHeader title={timetable.arrival.name} subText={`行き（${timetable.departure.name}発）`} />
      {timetable.timetables.length > 0 ? (
        timetable.timetables.map((row, index) => (
          <BulletinBody
            toPlace={timetable.arrival}
            dataType={TimetableDataType.Time}
            key={index}
            label={row.isLast ? lastLabel : labels[index]}
            timetable={row}
          />
        ))
      ) : timetable.timetables.length === 0 ? (
        <BulletinBody dataType={isSearch ? TimetableDataType.BusNotFound : TimetableDataType.BusFinished} />
      ) : (
        <BulletinBody dataType={TimetableDataType.NoBus} />
      )}
    </BulletinBoard>
  )
}

const BulletinBoard = styled.div`
  background-color: rgb(76, 83, 109);
  color: #fff;
`
