import React from 'react'

import { Col, Row } from 'react-bootstrap'
import Marquee from './Marquee'

import styled from 'styled-components'
import media from 'styled-media-query'
import { TimetableType } from '../../modules/Timetable/type'

export interface BulletinBodyProps {
  label?: string
  timetable?: TimetableType
}

export default function BulletinBody({ timetable, label }: BulletinBodyProps) {
  const fmtDate = (date: Date, format = 'h:m') => {
    format = format.replace(/Y/g, `${date.getFullYear()}`)
    format = format.replace(/M/g, `${date.getMonth() + 1}`)
    format = format.replace(/D/g, `${date.getDate()}`)
    format = format.replace(/h/g, `${date.getHours()}`)
    format = format.replace(/m/g, `${date.getMinutes()}`)
    format = format.replace(/s/g, `${date.getSeconds()}`)
    return format
  }

  return (
    <BoardBody>
      <div>
        {timetable ? (
          <Row>
            <Type xl={6} md={3}>
              {label}
            </Type>
            <Time xl={6} md={3}>
              {fmtDate(timetable.departureTime)}
            </Time>
            <Detail xl={12} md={6}>
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
