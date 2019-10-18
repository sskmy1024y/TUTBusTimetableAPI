import { Col, Jumbotron, Row } from 'react-bootstrap'
import { useDispatch, useEffect } from 'hooks'
import React from 'react'

import { thunkActionCreators } from 'middleware/thunkAction'
import TimeBoard from 'containers/TimeBoard'
import TitleComponent from 'components/TitleComponent'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import media from 'styled-media-query'
import styled from 'styled-components'

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(thunkActionCreators.getTimetable({ datetime: new Date(), searchType: null }))
  }, [dispatch])

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
            <TitleComponent />
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
