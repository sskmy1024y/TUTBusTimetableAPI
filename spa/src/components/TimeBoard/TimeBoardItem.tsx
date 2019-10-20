import React from 'react'
import { useSelector } from 'hooks'
import { Row } from 'react-bootstrap'

import { TimetableCollectType, TimetableDataType } from 'modules/Timetable/type'

import BulletinHeader from './BulletinHeader'
import { RootState } from 'modules'
import { BulletinBodyTime, FullMarquee } from './BulletinBody'

import styled from 'styled-components'
import media from 'styled-media-query'

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
      <BoardBody>
        <Row>
          {timetable.timetables.length > 0 ? (
            timetable.timetables.map((row, index) => (
              <BulletinBodyTime
                key={index}
                label={row.isLast ? lastLabel : labels[index]}
                timetable={{ ...row, arrival: timetable.arrival, departure: timetable.departure }}
              />
            ))
          ) : (
            <FullMarquee
              dataType={
                timetable.timetables.length === 0
                  ? isSearch
                    ? TimetableDataType.BusNotFound
                    : TimetableDataType.BusFinished
                  : TimetableDataType.NoBus
              }
            />
          )}
        </Row>
      </BoardBody>
    </BulletinBoard>
  )
}

const BulletinBoard = styled.div`
  background-color: rgb(76, 83, 109);
  color: #fff;
`

const BoardBody = styled.div`
  background-color: #222;

  ${media.lessThan('medium')`
    padding: 0 5px;
  `}

  ${media.greaterThan('medium')`
    padding: 0 20px;
  `}

  ${media.greaterThan('large')`
    padding: 0 50px;
  `}
`