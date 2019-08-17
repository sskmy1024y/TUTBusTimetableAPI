import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Container, Jumbotron, Row } from 'react-bootstrap'
import styled from 'styled-components'

function Home() {
  return (
    <Container>
      <Row>
        <Col md='4'>
          <MainIcon>
            <IconPoint>
              <FontAwesomeIcon icon='bus' />
            </IconPoint>
          </MainIcon>
        </Col>
        <Col md='8'>
          <Jumbotron>
            <h3>次の学バスは……</h3>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
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
