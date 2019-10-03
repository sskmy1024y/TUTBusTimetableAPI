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
  const fmtDate = (date: Date, format = 'hh:mm') => {
    format = format.replace(/YYYY/g, `${date.getFullYear()}`)
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2))
    format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2))
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
    return format
  }

  return (
    <BoardBody>
      <div>
        {timetable ? (
          <Row>
            <Type xs={6} lg={3}>
              {label}
            </Type>
            <Time xs={6} lg={3}>
              {fmtDate(timetable.departureTime)}
            </Time>
            <Detail xs={12} lg={6}>
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
