import { useDispatch, useInterval, useMemo, useSelector } from 'hooks'
import React from 'react'

import { Detail, Time, Type, WarningSpan } from './StyledComponents'
import { NowShattle, WarningLastBus } from '.'
import { PlaceType } from 'lib/types'
import { RootState } from 'modules'
import { TimetableType } from 'modules/Timetable/type'
import { adjustDate, formatDate } from 'lib/utils'
import { thunkActionCreators } from 'middleware/thunkAction'
import Marquee from '../Marquee'

interface TimeTableSimpleDetail extends TimetableType {
  arrival: PlaceType
  departure: PlaceType
}

interface TimeProps {
  timetable: TimeTableSimpleDetail
  label: string
  marquee?: JSX.Element
}

export function DefaultView({ timetable: { arrival, departureTime, isShuttle, isLast }, label, marquee }: TimeProps) {
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
        {(marquee || isShuttle || isLast) && <Marquee>{marqueeContents}</Marquee>}
      </Detail>
    </>
  )
}
