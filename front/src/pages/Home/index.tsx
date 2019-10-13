import React from 'react'
import { useDispatch, useState, useEffect } from '../../hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Jumbotron, Row, Button } from 'react-bootstrap'

import TimeBoard from '../../containers/TimeBoard'
import { thunkActionCreators } from '../../middleware/thunkAction'

import styled from 'styled-components'
import media from 'styled-media-query'
import SearchModal from 'components/SearchModal'

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()

  const date = new Date()

  const handleShowModal = () => {
    setShowModal(!showModal)
  }

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
              <SearchButton onClick={handleShowModal} variant="secondary">
                <FontAwesomeIcon icon="search" />
              </SearchButton>
            </TitleComponent>
            <TimeBoard />
          </JumbotronContainer>
        </Col>
        <SearchModal show={showModal} onHide={() => setShowModal(false)} />
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

const SearchButton = styled(Button)`
  padding: 0px 10px;
  margin-bottom: 8px;
`

const JumbotronContainer = styled(Jumbotron)`
  padding: 2rem 1rem;

  ${media.lessThan('small')`
    padding: 1rem 1rem 2rem;
  `}
`
