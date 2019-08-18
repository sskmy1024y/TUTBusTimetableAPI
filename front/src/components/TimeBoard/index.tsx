import React from 'react'

import BulletinHeader from './BulletinHeader'

import { TimetableListType } from 'lib/types'
import styled from 'styled-components'
import BulletinBody from './BulletinBody'

interface TimeBoardProps {
  timetableList: TimetableListType
}

export default function TimeBoard({ timetableList }: TimeBoardProps) {
  const labels = ['先発', '次発', '次々発', '四発', '五発']

  return (
    <BulletinBoard>
      <BulletinHeader text='時刻表' />
      {timetableList.list.map((timetable, index) => {
        return <BulletinBody label={labels[index]} timetable={timetable} />
      })}
    </BulletinBoard>
  )
}

const BulletinBoard = styled.div`
  background-color: rgb(76, 83, 109);
  color: #fff;
`
