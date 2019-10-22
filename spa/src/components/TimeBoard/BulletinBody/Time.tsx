import React from 'react'
import { useMemo, useDispatch, useSelector, useInterval } from 'hooks'
import { RootState } from 'modules'

import { TimetableType } from 'modules/Timetable/type'
import { Type, WarningSpan, Time, Detail, AttentionSpan, InfoSpan } from './StyledComponents'
import Marquee from '../Marquee'
import { formatDate, adjustDate } from 'lib/utils'
import { PlaceType } from 'lib/types'
import { thunkActionCreators } from 'middleware/thunkAction'

interface TimeTableSimpleDetail extends TimetableType {
  arrival: PlaceType
  departure: PlaceType
}

interface TimeProps {
  timetable: TimeTableSimpleDetail
  label: string
  marquee?: JSX.Element
}

export function BulletinBodyTime({
  timetable: { arrival, departureTime, isShuttle, isLast },
  label,
  marquee,
}: TimeProps) {
  const dispatch = useDispatch()
  const isSearch = useSelector<RootState, boolean>(state => state.search.isSearch)

  useInterval(() => {
    if (!isSearch) {
      const datetime = new Date()
      if (adjustDate(departureTime, datetime).getTime() < datetime.getTime()) {
        dispatch(
          thunkActionCreators.getTimetable({
            datetime,
            searchType: null,
          })
        )
      }
    }
  }, 1000)

  const dateStr = useMemo(() => formatDate(departureTime), [departureTime])

  const marqueeContents = useMemo(
    () => (
      <>
        {isShuttle && <NowShattle />}
        {isLast && <WarningLastBus place={arrival} />}
        {!!marquee && marquee}
      </>
    ),
    [marquee, isShuttle, arrival, isLast]
  )

  return (
    <>
      <Type xs={6} md={3}>
        {isLast ? <WarningSpan>{label}</WarningSpan> : label}
      </Type>
      <Time xs={6} md={3}>
        {dateStr}
      </Time>
      <Detail xs={12} md={6}>
        {marquee && <Marquee>{marqueeContents}</Marquee>}
      </Detail>
    </>
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

function WarningLastBus({ place }: { place: PlaceType }) {
  return (
    <>
      <AttentionSpan>{place.name}</AttentionSpan>
      <InfoSpan>行き</InfoSpan>
      <WarningSpan>最終バス</WarningSpan>
      <InfoSpan>です。</InfoSpan>
    </>
  )
}
