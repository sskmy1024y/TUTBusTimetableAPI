import React, { useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Jumbotron, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import styled from 'styled-components'
import { thunkActionCreators } from '../../middleware/thunkAction'
import { RootState } from '../../modules'

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, Action>) => {
  return {
    fetchTimetable: (date: Date) => {
      dispatch(
        thunkActionCreators.fetchTimetable({
          date,
        })
      )
    },
  }
}

interface HomeProps {
  fetchTimetable(date: Date): void
}

function Home({ fetchTimetable }: HomeProps) {
  useEffect(() => {
    fetchTimetable(new Date())
  })

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
          <Jumbotron>
            <h3 className="display-4">次の学バスは……</h3>
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

export default connect(
  null,
  mapDispatchToProps
)(Home)
