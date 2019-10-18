import { Col, Row } from 'react-bootstrap'
import { useDispatch, useInterval, useMemo, useSelector } from 'hooks'
import React from 'react'

import { TimetableDataType, TimetableType } from 'modules/Timetable/type'
import { adjustDate, formatDate } from 'lib/utils/'
import { thunkActionCreators } from 'middleware/thunkAction'
import Marquee from './Marquee'

import media from 'styled-media-query'
import styled from 'styled-components'
import { RootState } from 'modules'
import { PlaceType } from 'lib/types'

export interface BulletinBodyProps {
  dataType: TimetableDataType
  label?: string
  timetable?: TimetableType
  toPlace?: PlaceType
}

export default function BulletinBody({ dataType, timetable, label, toPlace }: BulletinBodyProps) {
  const dispatch = useDispatch()
  const dateStr = useMemo(() => (timetable !== undefined ? formatDate(timetable.departureTime) : ''), [timetable])
  const isSearch = useSelector<RootState, boolean>(state => state.searchEnable)

  useInterval(() => {
    const date = new Date()
    if (timetable !== undefined && isSearch && adjustDate(timetable.departureTime, date).getTime() < date.getTime()) {
      dispatch(
        thunkActionCreators.getTimetable({
          date,
        })
      )
    }
  }, 1000)

  const bodyView = useMemo(
    () =>
      dataType === TimetableDataType.Time && timetable !== undefined ? (
        <Row>
          <Type xs={6} md={3}>
            {timetable.isLast ? <WarningSpan>{label}</WarningSpan> : label}
          </Type>
          <Time xs={6} md={3}>
            {dateStr}
          </Time>
          <Detail xs={12} md={6}>
            {(timetable.isShuttle || timetable.isLast) && (
              <Marquee>
                {timetable.isShuttle && <NowShattle />}
                {timetable.isLast && toPlace !== undefined && <WaningLastBus place={toPlace} />}
              </Marquee>
            )}
          </Detail>
        </Row>
      ) : dataType === TimetableDataType.BusFinished ? (
        <Row>
          <Detail xl={12} md={12}>
            <Marquee>
              <AttentionSpan>本日の運行は終了しました</AttentionSpan>
            </Marquee>
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
      ),
    [dataType, dateStr, label, timetable, toPlace]
  )

  return <BoardBody>{bodyView}</BoardBody>
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

function WaningLastBus({ place }: { place: PlaceType }) {
  return (
    <>
      <AttentionSpan>{place.name}</AttentionSpan>
      <InfoSpan>行き</InfoSpan>
      <WarningSpan>最終バス</WarningSpan>
      <InfoSpan>です。</InfoSpan>
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

const WarningSpan = styled.span`
  color: red;
`

const InfoSpan = styled.span`
  color: greenyellow;
`
