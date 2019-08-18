import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Jumbotron, Row } from 'react-bootstrap'
import styled from 'styled-components'

function Home() {
  return (
    <>
      <Row>
        <Col md='4'>
          <MainIcon>
            <IconPoint>
              <FontAwesomeIcon icon='bus' size='5x' />
            </IconPoint>
          </MainIcon>
        </Col>
        <Col md='8'>
          <Jumbotron>
            <h3 className='display-4'>次の学バスは……</h3>
          </Jumbotron>
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
`

const IconPoint = styled.p`
  text-align: center;
  font-size: 3em;
`

export default Home
