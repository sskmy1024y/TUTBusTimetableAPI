import { useMemo } from 'hooks'
import React from 'react'

import { Col } from 'react-bootstrap'
import { Detail, Time, Type, WarningSpan } from './StyledComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NowShattle, WarningLastBus } from '.'
import { PlaceType } from 'lib/types'
import { TimetableType } from 'modules/Timetable/type'
import { formatDate } from 'lib/utils'
import Marquee from '../Marquee'
import styled from 'styled-components'

interface TimeTableSimpleDetail extends TimetableType {
  arrival: PlaceType
  departure: PlaceType
}

interface TimeProps {
  timetable: TimeTableSimpleDetail
  label: string | number
  marquee?: JSX.Element
}

export function SearchResult({
  timetable: { arrival, arrivalTime, departureTime, isShuttle, isLast },
  label,
  marquee,
}: TimeProps) {
  const departureTimeStr = useMemo(() => formatDate(departureTime), [departureTime])
  const arrivalTimeStr = useMemo(() => formatDate(arrivalTime), [arrivalTime])

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
      <Type xs={3} md={2}>
        {isLast ? <WarningSpan>{label}</WarningSpan> : label}
      </Type>
      <Time xs={3} md={2}>
        {departureTimeStr}
      </Time>
      <WhiteSpan xs={1} md={1}>
        <FontAwesomeIcon icon="chevron-right" size="1x" />
      </WhiteSpan>
      <Time xs={3} md={2}>
        {arrivalTimeStr}
      </Time>
      <Detail xs={12} md={5}>
        {(marquee || isShuttle || isLast) && <Marquee>{marqueeContents}</Marquee>}
      </Detail>
    </>
  )
}

const WhiteSpan = styled(Col)`
  font-size: 22px;
  color: #fff;
  text-align: center;
`
