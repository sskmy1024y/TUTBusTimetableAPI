import { Col, Jumbotron, Row } from 'react-bootstrap'
import { useDispatch, useEffect } from 'hooks'
import React from 'react'

import { thunkActionCreators } from 'middleware/thunkAction'
import SearchModal from 'components/SearchModal'
import TimeBoard from 'containers/TimeBoard'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import media from 'styled-media-query'
import styled from 'styled-components'

export default function Home() {
  const dispatch = useDispatch()

  const date = new Date()

  useEffect(() => {
    dispatch(thunkActionCreators.getTimetable({ date }))
  }, [date, dispatch])

  return (
    <>
      <Row>
        <Col md="4">
          <MainIcon>
            <IconPoint>
              <FontAwesomeIcon icon="bus" size="5x" />
            </IconPoint>
          </MainIcon>
        </Col>
        <Col md="8">
          <JumbotronContainer>
            <TitleComponent>
              <Title>次の学バス</Title>
              <SearchModal />
            </TitleComponent>
            <TimeBoard />
          </JumbotronContainer>
        </Col>
      </Row>
    </>
  )
}

const MainIcon = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.lessThan('small')`
    display: none;
  `}
`

const TitleComponent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
`

const Title = styled.h3`
  font-size: 2.1rem;
  font-weight: 300;
  line-height: 1.2;
`

const IconPoint = styled.p`
  text-align: center;
  font-size: 3em;
`

const JumbotronContainer = styled(Jumbotron)`
  padding: 2rem 1rem;

  ${media.lessThan('small')`
    padding: 1rem 1rem 2rem;
  `}
`
