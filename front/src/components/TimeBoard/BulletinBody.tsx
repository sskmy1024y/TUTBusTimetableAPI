import React from 'react'

import { Col, Row } from 'react-bootstrap'
import { TimetableType } from 'src/lib/types'
import Marguee from './Marquee'

import styled from 'styled-components'
import media from 'styled-media-query'

export interface BulletinBodyProps {
  timetable?: TimetableType
}

export default function BulletinBody({ timetable }: BulletinBodyProps) {
  return (
    <BoardBody>
      <div>
        {timetable ? (
          <Row>
            <Type lg={6} md={3}>
              {'最終'}
            </Type>
            <Time lg={6} md={3}>
              {'10:00'}
            </Time>
            <Detail lg={12} md={6}>
              {'marqee'}
            </Detail>
          </Row>
        ) : (
          <Row>
            <Detail lg={12} md={12}>
              <Marguee></Marguee>
            </Detail>
          </Row>
        )}
      </div>
    </BoardBody>
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
