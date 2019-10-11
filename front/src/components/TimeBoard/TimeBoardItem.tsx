import React from 'react'

import BulletinHeader from './BulletinHeader'

import styled from 'styled-components'
import { TimetableCollectType } from '../../modules/Timetable/type'
import BulletinBody from './BulletinBody'

interface TimeBoardProps {
  timetable: TimetableCollectType
}

export default function TimeBoardItem({ timetable }: TimeBoardProps) {
  const labels = ['先発', '次発', '次々発', '四発', '五発']
  return (
    <BulletinBoard>
      <BulletinHeader title={timetable.departure.name} subText={`行き（${timetable.arrival.name}発）`} />
      {timetable.timetables.map((row, index) => {
        return <BulletinBody key={index} label={labels[index]} timetable={row} />
      })}
    </BulletinBoard>
  )
}

const BulletinBoard = styled.div`
  background-color: rgb(76, 83, 109);
  color: #fff;
`
