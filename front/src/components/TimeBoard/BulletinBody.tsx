import React from 'react'

import { TimetableType } from 'lib/types'
import { Col, Row } from 'react-bootstrap'
import Marquee from './Marquee'

import styled from 'styled-components'
import media from 'styled-media-query'

export interface BulletinBodyProps {
  label?: string
  timetable?: TimetableType
}

export default function BulletinBody({ timetable, label }: BulletinBodyProps) {
  return (
    <BoardBody>
      <div>
        {timetable ? (
          <Row>
            <Type lg={6} md={3}>
              {label}
            </Type>
            <Time lg={6} md={3}>
              {timetable.departureTime.getTime()}
            </Time>
            <Detail lg={12} md={6}>
              {timetable.isShuttle && (
                <Marquee>
                  <NowShattle />
                </Marquee>
              )}
            </Detail>
          </Row>
        ) : (
          <Row>
            <Detail lg={12} md={12}>
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
    padding: 0 50px;
  `}

  ${media.greaterThan('medium')`
    padding: 0 5px;
  `}
`

const Type = styled(Col)`
  display: inline-block;
  font-size: 24px;
  color: greenyellow;
`

const Time = styled(Col)`
  display: inline-block;
  font-size: 25px;
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
