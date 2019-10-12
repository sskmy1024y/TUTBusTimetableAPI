import React from 'react'
import { useMemo, useInterval, useDispatch } from '../../hooks'

import { Col, Row } from 'react-bootstrap'
import Marquee from './Marquee'

import styled from 'styled-components'
import media from 'styled-media-query'
import { formatDate, adjustDate } from '../../lib/utils/'
import { TimetableType } from '../../modules/Timetable/type'
import { thunkActionCreators } from 'middleware/thunkAction'

export interface BulletinBodyProps {
  label?: string
  timetable?: TimetableType
}

export default function BulletinBody({ timetable, label }: BulletinBodyProps) {
  const dispatch = useDispatch()
  const dateStr = useMemo(() => (timetable !== undefined ? formatDate(timetable.departureTime) : ''), [timetable])

  useInterval(() => {
    const date = new Date()
    if (timetable !== undefined && adjustDate(timetable.departureTime, date).getTime() < date.getTime()) {
      dispatch(
        thunkActionCreators.getTimetable({
          date,
        })
      )
    }
  }, 1000)

  return (
    <BoardBody>
      <div>
        {timetable ? (
          <Row>
            <Type xs={6} md={3}>
              {label}
            </Type>
            <Time xs={6} md={3}>
              {dateStr}
            </Time>
            <Detail xs={12} md={6}>
              {timetable.isShuttle && (
                <Marquee>
                  <NowShattle />
                </Marquee>
              )}
            </Detail>
          </Row>
        ) : (
          <Row>
            <Detail xl={12} md={12}>
              <Marquee>
                <AttentionSpan>本日の運行はありません</AttentionSpan>
              </Marquee>
            </Detail>
          </Row>
        )}
      </div>
    </BoardBody>
  )
}

function NowShattle() {
  return (
    <>
      <AttentionSpan>シャトル運行中</AttentionSpan>
      <InfoSpan>のため、</InfoSpan>
      <AttentionSpan>時間が前後する場合</AttentionSpan>
      <InfoSpan>があります</InfoSpan>
    </>
  )
}

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

const Type = styled(Col)`
  display: inline-block;
  font-size: 24px;
  color: greenyellow;
`

const Time = styled(Col)`
  display: inline-block;
  font-size: 26px;
  line-height: 35px;
  color: orange;
`

const Detail = styled(Col)`
  display: inline-block;
  font-size: 22px;
`

const AttentionSpan = styled.span`
  color: orange;
`

const InfoSpan = styled.span`
  color: greenyellow;
`
